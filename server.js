const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
require("./src/models");
dotenv.config();
const HttpException = require('./src/utils/HttpException.utils');
const errorMiddleware = require('./src/middleware/error.middleware');

const port = Number(process.env.PORT || 3000);
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://app.opem.com.co");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(cors())

require("./src/routes")(app);

// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
  console.log(`🚀 Server running on port ${port}!`)
);