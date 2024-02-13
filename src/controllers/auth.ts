import { hash } from 'bcryptjs';
import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { matchedData, validationResult } from 'express-validator';
import passport from 'passport';
import User from '../models/User';

import signupValidations from '../validations/signup';
import loginValidations from '../validations/login';

export const signup_GET: RequestHandler = (req, res, next) => {
  res.render('sign-up');
};

export const signup_POST: RequestHandler[] = [
  ...signupValidations,
  asyncHandler(async (req, res, next) => {
    const vResult = validationResult(req);
    const data: { username?: string; password?: string } = matchedData(req, {
      onlyValidData: true,
    });

    if (!vResult.isEmpty()) {
      return res.render('sign-up', {
        username: data.username,
        errors: vResult.array(),
      });
    }

    const hashedPassword = await hash(data.password!, 16);

    const user = new User({
      username: data.username!,
      password: hashedPassword,
    });

    await user.save();

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.redirect('/');
    });
  }),
];

export const login_GET: RequestHandler = (req, res, next) => {
  res.render('log-in');
};

export const login_POST: RequestHandler[] = [
  ...loginValidations,
  (req, res, next) => {
    const vResult = validationResult(req);
    const { username } = matchedData(req);

    if (!vResult.isEmpty())
      return res.render('log-in', {
        username,
        errors: vResult.array(),
      });

    passport.authenticate('local', (err: Error, user: Express.User) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        const error = { msg: 'Invalid credentials' };

        return res.render('log-in', {
          username,
          errors: [error],
        });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        res.redirect('/');
      });
    })(req, res, next);
  },
];

export const logout_GET: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
};
