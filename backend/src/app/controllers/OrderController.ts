import { Response, Request } from 'express';
import * as Yup from 'yup';

import Recipient from 'app/models/Recipient';
import Deliveryman from 'app/models/Deliveryman';
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

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const order = await Order.create({
      deliveryman_id,
      recipient_id,
      product,
    });

    return res.json(order);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id, product } = req.body;
    const { id: order_id } = req.params;

    const orderExists = await Order.findByPk(order_id);

    if (!orderExists) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists' });
    }

    const order = await orderExists.update(req.body);

    return res.json(order);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: order_id } = req.params;

    const order = await Order.findByPk(order_id);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    await order.destroy();

    return res.json();
  }
}

export default new OrderController();
