import { Response, Request } from 'express';
import * as Yup from 'yup';

import Deliveryman from 'app/models/Deliveryman';

class DeliverymanController {
  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Email already register' });
    }

    const { name, email } = await Deliveryman.create(req.body);

    return res.json({ name, email });
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const deliverymans = await Deliveryman.findAll();

    return res.json(deliverymans);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: true });
  }
}

export default new DeliverymanController();
