import { RequestHandler } from 'express';

const populateUser: RequestHandler = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

export default populateUser;
