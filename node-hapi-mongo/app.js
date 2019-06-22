const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
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

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();