import { Types as MongooseTypes } from 'mongoose';

declare global {
  namespace Express {
    interface User {
      _id: MongooseTypes.ObjectId;
      username: string;
      password: string;
    }
  }
}
