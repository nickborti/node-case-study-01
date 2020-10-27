const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

app.use(logger('dev'));
app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

app.use(busboyBodyParser({
    limit: '50mb'
}));
require('./gridfs-mongodb')(app);

app.use(bodyParser.json());
require('./config/db.config');


// Routes
const authRoute = require('./router/auth');
const testRoute = require('./router/test');

// const fileRoute = require('./gridfs-mongodb');

app.use('/api/auth', authRoute);
app.use('/api/test', testRoute);

// app.listen(PORT, () => {
//     console.log(`Listening to PORT ${PORT}`);
//     app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// });

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;