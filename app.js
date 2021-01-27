const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

/* PRUEBAS MYSQL */

/* const mysql = require('mysql');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'gymcovid',
  }
);

connection.connect((error) => {
  if (error) console.log(error);
  console.log('Se ha conectado corrrectamente xD');
  connection.query('select * from clientes', (error, rows) => {
    if (error) return console.log(error);
    console.log(rows);
  })
}); */




/* FIN DE LAS PRUEBAS MYSQL */

/* const dbConfig = require('./dbConfig');
dbConfig.createPool(); */

require('./dbConfig').createPool();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clientesRouter = require('./routes/clientes');
const apiRouter = require('./routes/api');

const app = express();

/* esto se pone para que las llamadas enttre localhost se desbloqueen y funcionen */
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clientes', clientesRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
