import { RequestHandler } from 'express';

export const room_GET: RequestHandler = (req, res, next) => {
  res.render('room');
};
