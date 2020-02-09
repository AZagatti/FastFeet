import { Response } from 'express';
import * as Yup from 'yup';

import User from 'app/models/User';

interface Body extends ReadableStream<Uint8Array> {
  email: string;
  password: string;
}

export interface RequestOptions extends Request {
  userId: string;
  body: Body;
}

class UserController {
  public async store(req: RequestOptions, res: Response): Promise<Response> {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
