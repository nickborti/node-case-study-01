const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/server');

const server = awsServerlessExpress.createServer(app);

exports.lambda = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
}