import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  MONGODB_URI: str({
    desc: 'MongoDB connection string',
    example:
      'mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority',
  }),
  SESSION_SECRET: str({
    desc: 'express-session secret',
    docs: 'https://www.npmjs.com/package/express-session',
  }),
});

export default env;
