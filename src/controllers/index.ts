import { RequestHandler } from 'express';

export const index_GET: RequestHandler = (req, res, next) => {
  res.render('index');
};
