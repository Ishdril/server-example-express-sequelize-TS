import { Request, Response } from 'express';
import { User } from '../models/User';
import { Message } from '../models/Message';

export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const messages = await Message.findAll({ where: { ownerId: id } });
    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const postNewMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) throw new Error('invalid user');

    // The message is created from the user that will own it. This way sequelize creates the association right away.
    const message = await user.createMessage({ text: req.body.text });
    res.status(201).send(message);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
