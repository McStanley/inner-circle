import { body } from 'express-validator';

const validations = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('You cannot post an empty message')
    .isLength({ max: 700 })
    .withMessage('Message cannot be longer than 700 characters'),
];

export default validations;
