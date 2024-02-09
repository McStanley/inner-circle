import { RequestHandler } from 'express';

export const signup_GET: RequestHandler = (req, res, next) => {
  res.render('sign-up');
};

export const login_GET: RequestHandler = (req, res, next) => {
  res.render('log-in');
};
