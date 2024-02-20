import cookieParser from 'cookie-parser';
import express, { ErrorRequestHandler } from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import passport from 'passport';
import path from 'path';

import session from './middleware/session';
import populateUser from './middleware/populateUser';

import indexRouter from './routes/index';
import authRouter from './routes/auth';
import roomRouter from './routes/room';

import './auth/initPassport';

const ROOT_DIR = path.join(__dirname, '..');

const app = express();

// view engine setup
app.set('views', path.join(ROOT_DIR, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(populateUser);

app.use('/static', express.static(path.join(ROOT_DIR, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/room', roomRouter);

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
} satisfies ErrorRequestHandler);

export default app;
