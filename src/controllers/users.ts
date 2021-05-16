import { Request, Response } from 'express';
import { User } from '../models/User';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const postNewUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
