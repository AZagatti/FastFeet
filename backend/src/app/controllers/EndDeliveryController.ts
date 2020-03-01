import { Response, Request } from 'express';
import * as Yup from 'yup';

import Deliveryman from 'app/models/Deliveryman';
import Order from 'app/models/Order';
import File from 'app/models/File';

class EndDeliveryController {
  public async update(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { signature_id } = req.body;

    const file = await File.findByPk(signature_id);

    if (!file) {
      return res
        .status(400)
        .json({ error: 'The signature file does not exist' });
    }

    const { deliverymanId, deliveryId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman does not exists' });
    }

    const order = await Order.findByPk(deliveryId);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    if (order.canceled_at) {
      return res.status(400).json({ error: 'The order was canceled' });
    }

    if (!order.start_date) {
      return res.status(400).json({ error: 'The order must be initiated' });
    }

    if (order.end_date) {
      return res
        .status(400)
        .json({ error: 'The order has already been finalized' });
    }

    if (new Date() < new Date(order.start_date)) {
      return res
        .status(401)
        .json({ error: 'End date must be greater than start date' });
    }

    await order.update({
      end_date: new Date(),
      signature_id,
    });

    return res.json(order);
  }
}

export default new EndDeliveryController();
