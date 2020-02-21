import { Response, Request } from 'express';
import * as Yup from 'yup';

import Admin from 'app/models/Admin';

class AdminController {
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

    const adminExists = await Admin.findOne({
      where: { email: req.body.email },
    });

    if (adminExists) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const { id, name, email } = await Admin.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new AdminController();
