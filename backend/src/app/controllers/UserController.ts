import { Response, Request } from 'express';
import * as Yup from 'yup';

import User from 'app/models/User';

// interface Body extends ReadableStream<Uint8Array> {
//   email: string;
//   password: string;
// }

// export interface RequestOptions extends Request {
//   userId: string;
//   body: Body;
// }

class UserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

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
