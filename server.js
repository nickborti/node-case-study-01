const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('./config/db.config');

// Routes
const authRoute = require('./router/auth');
const testRoute = require('./router/test');

app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
