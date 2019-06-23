const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const Person = require('./datamodels/Person')
const {performance} = require('perf_hooks');

const mongoURI = 'mongodb://mongo:27017/node-hapi-mongo';
function connect() {
  mongoose
    .connect(mongoURI, {
      socketOptions: { autoReconnect: true },
      reconnectInterval: 5000,
    })
    .then(val => {console.log("Worked! = ", val);})
    .catch(err => console.log("Failed mongoose connection", err));
}
connect();
// mongoose
//     .connect(
//         'mongodb://mongo:27017/node-hapi-mongo', 
//         {useNewUrlParser: true}
//     )
//     .then(val => {console.log("Worked! = ", val);})
//     .catch(err => console.log("Failed mongoose connection", err));

// const connectionString = 'mongodb+srv://Marius2m:parola@haufe-y2a8i.mongodb.net/test?retryWrites=true&w=majority'
// mongoose.connect(
//   connectionString
// );

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        routes: {
          cors: true
      }
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

    // 3RD ENDPOINT
    server.route({
      method: 'GET',
      path: '/getAggregationTime',
      handler: (request, h) => {
        const startTime = performance.now();

        return Person.find({})
          .exec()
          .then(doc => {
            const endTime = performance.now();

            return h
              .response({
                allPersons: doc,
                time: (endTime - startTime) / 1000
              })
              .code(200);
          })
          .catch(err => {
            return new Promise((resolve, reject) => {
              const res = {
                error: err,
              }
              resolve(h.response(res).code(404))
            });
          });
      }
    });

    // 1ST ENDPOINT
    server.route({
      method: 'GET',
      path: '/mongoStatus',
      handler: (request, h) => {
        const mongooseState = mongoose.STATES[mongoose.connection.readyState];
        return { "mongo-status2" : mongooseState };
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
        }
    });

    // 3RD ENDPOINT ?
    server.route({
      method: 'GET',
      path: '/{user}',
      handler: (request, h) => {
        const startTime = performance.now();
        const userId = request.params.user;

        return Person.findById(userId)
          .exec()
          .then(doc => {
            const endTime = performance.now();

            if (doc) {
              return h
                .response({
                  user: doc,
                  time: (endTime - startTime) / 1000
                })
                .code(200);
            }
            return h
              .response(
                {
                  message: `No user found for id ${userId}`,
                  time: (endTime - startTime) / 1000
                }
              )
              .code(204);
          })
          .catch(err => {
            const endTime = performance.now();
            return new Promise((resolve, reject) => {
              const res = {
                error: err,
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