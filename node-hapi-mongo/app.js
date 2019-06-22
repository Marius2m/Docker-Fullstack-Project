const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const Person = require('./datamodels/Person')
const {performance} = require('perf_hooks');
const connectionString = 'mongodb+srv://Marius2m:parola@haufe-y2a8i.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(
  connectionString
);

const init = async () => {

    const server = Hapi.server({
        port: 3000
    });

    server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {
            return 'Hello GUYS!';
        }
    });

    server.route({
      method: 'GET',
      path: '/test',
      handler: (request, h) => {
        return new Promise((resolve, reject) => resolve(h.response('amazing!').code(200)));
      }
    });

    // 1ST ENDPOINT
    server.route({
      method: 'GET',
      path: '/mongoStatus',
      handler: (request, h) => {
        const mongooseState = mongoose.STATES[mongoose.connection.readyState];
        return { "mongo status" : mongooseState };
      }
    });

    // 2ND ENDPOINT
    server.route({
        method: 'POST',
        path: '/signup',
        handler: function (request, h) {
          const person = new Person({
            _id: new mongoose.Types.ObjectId(),
            name: request.payload.name,
            age: request.payload.age,
          })
          person.save()
            .then(result => {
              console.log(result);
            })
            .catch(err => console.log(err));

            return h.response(person).code(201);
            // const payload = request.payload;
            // return `Welcome ${encodeURIComponent(payload.username)}!`;
        }
    });

    // 3RD ENDPOINT ?
    server.route({
      method: 'GET',
      path: '/{user}',
      handler: (request, h) => {
        performance.mark('start');
        const startTime = performance.now();
        const userId = request.params.user;
        return Person.findById(userId)
          .exec()
          .then(doc => {
            performance.mark('end');
            performance.measure('response time', 'start', 'end');
            const measure = performance.getEntries('response time')[0];
            const endTime = performance.now();

            if (doc) {
              return h
                .response({
                  user: doc,
                  completionTime: measure.duration / 1000,
                  time: (endTime - startTime) / 1000
                })
                .code(200);
            }
            return h
              .response(
                {
                  message: `No user found for id ${userId}`,
                  completionTime: measure.duration
                }
              )
              .code(204);
          })
          .catch(err => {
            performance.mark('end');
            performance.measure('response time', 'start', 'end');
            const measure = performance.getEntries('response time')[0];
            const endTime = performance.now();

            return new Promise((resolve, reject) => {
              const res = {
                error: err,
                completionTime: measure.duration / 1000,
                time: (endTime - startTime) / 1000
              }
              resolve(h.response(res).code(404))
              
            });
          });
      }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();