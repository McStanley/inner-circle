import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { matchedData, validationResult } from 'express-validator';
import Message from '../models/Message';
import messageValidations from '../validations/message';

export const room_GET: RequestHandler = asyncHandler(async (req, res, next) => {
  const messages = await Message.find()
    .sort({ date: -1 })
    .populate('author', { username: 1 });

  res.render('room', { messages });
});

export const submit_POST: RequestHandler[] = [
  ...messageValidations,
  asyncHandler(async (req, res, next) => {
    const vResult = validationResult(req);
    const { message: text }: { message?: string } = matchedData(req, {
      onlyValidData: false,
    });

    if (!vResult.isEmpty()) {
      const messages = await Message.find()
        .sort({ date: -1 })
        .populate('author', { username: 1 });

      return res.render('room', {
        errors: vResult.array(),
        messageText: text,
        messages,
      });
    }

    if (!req.user) {
      const messages = await Message.find()
        .sort({ date: -1 })
        .populate('author', { username: 1 });

      return res.render('room', {
        errors: [{ msg: 'You have to log in first' }],
        messageText: text,
        messages,
      });
    }

    const message = new Message({
      author: req.user._id,
      date: new Date(),
      text,
    });

    await message.save();

    res.redirect('/room');
  }),
];

export const delete_GET: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const message = await Message.findById(req.params.id).populate('author', {
      username: 1,
    });

    if (!message) {
      throw new Error('Could not find this message');
    }

    res.render('delete', { message });
  },
);

export const delete_POST: RequestHandler = asyncHandler(
  async (req, res, next) => {
    const message = await Message.findById(req.params.id).populate('author', {
      username: 1,
    });

    if (!message) {
      throw new Error('Could not find this message');
    }

    if (!req.user || !message.author._id.equals(req.user._id)) {
      throw new Error('You are not authorized to delete this message');
    }

    await message.deleteOne();

    res.redirect('/room');
  },
);
