var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/user-routes');

var app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000; // Set a default port if PORT environment variable is not set
const http = require('http');
const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

var cors = require('cors')
var dbConnect = require('./src/connect');
var socketConnect = require('./src/socket')

dbConnect.initiateDBConnection();
socketConnect.socketConnection(io);

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('src/public'));

app.use(cors({
  origin:'*'
}))


app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);

server.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', onError);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}