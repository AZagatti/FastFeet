import { Response, Request } from 'express';
import { Op } from 'sequelize';

import Recipient from 'app/models/Recipient';
import Deliveryman from 'app/models/Deliveryman';
import Order from 'app/models/Order';

class DeliveredController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query;
    const { deliverymanId } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not exists' });
    }

    const deliveries = await Order.findAll({
      limit: 15,
      offset: (page - 1) * 10,
      where: {
        deliveryman_id: deliverymanId,
        canceled_at: null,
        start_date: {
          [Op.ne]: null,
        },
        end_date: {
          [Op.ne]: null,
        },
      },
      attributes: ['id', 'product'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'avatar_id', 'email'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new DeliveredController();
