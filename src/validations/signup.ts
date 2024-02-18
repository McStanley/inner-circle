import { body } from 'express-validator';
import User from '../models/User';

const validations = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ max: 24 })
    .withMessage('Username cannot exceed 24 characters')
    .custom(async (input) => {
      const existingUser = await User.findOne({ username: input }).collation({
        locale: 'en',
        strength: 2,
      });

      if (existingUser) {
        throw new Error('This username is taken');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail({ level: 'request' })
    .isLength({ min: 6 })
    .withMessage('Minimum password length is 6 characters')
    .bail({ level: 'request' }),
  body('password2')
    .custom((input, { req }) => {
      return input === req.body.password;
    })
    .withMessage('Passwords do not match'),
];

export default validations;
