import { Response, Request } from 'express';
import * as Yup from 'yup';

import Recipient from 'app/models/Recipient';

class RecipientController {
  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {}
}

export default new RecipientController();
