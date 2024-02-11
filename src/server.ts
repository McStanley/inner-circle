#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app';
import debug from 'debug';
import http from 'http';
import mongoose from 'mongoose';

/**
 * Load environment variables.
 */

import 'dotenv/config';

/**
 * Connect to database.
 */

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI variable missing from .env');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'innerCircle' })
  .catch((e: Error) => console.error(e.toString()));

mongoose.connection.on('connected', () => console.log('MongoDB: Connected'));
mongoose.connection.on('error', (e: Error) => console.error(e.toString()));

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
  debug('inner-circle:server')('Listening on ' + bind);
}
