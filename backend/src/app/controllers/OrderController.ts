import { Response, Request } from 'express';
import * as Yup from 'yup';

import Order from 'app/models/Order';

class OrderController {
  public async index(req: Request, res: Response): Promise<Response> {
    const orders = await Order.findAll();

    return res.json(orders);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    return res.json({ ok: true });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: true });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    return res.json({ ok: true });
  }
}

export default new OrderController();
