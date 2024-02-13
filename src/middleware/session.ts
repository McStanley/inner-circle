import MongoStore from 'connect-mongo';
import expressSession from 'express-session';

import env from '../env';

const session = expressSession({
  secret: env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: env.MONGODB_URI,
    dbName: 'innerCircle',
  }),
  resave: false,
  saveUninitialized: true,
});

export default session;
