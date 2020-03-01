import { Response, Request } from 'express';
import { Op } from 'sequelize';
import * as Yup from 'yup';

import Order from 'app/models/Order';
import DeliveryProblem from 'app/models/DeliveryProblem';

import CancellationMail from 'app/jobs/CancellationMail';
import Queue from 'lib/Queue';
import Deliveryman from 'app/models/Deliveryman';

class DeliveryProblemController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { page = 1 } = req.query;

    const problems = await DeliveryProblem.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'delivery_id', 'created_at', 'updated_at'],
      where: {
        description: {
          [Op.ne]: null,
        },
      },
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: [
            'id',
            'recipient_id',
            'deliveryman_id',
            'product',
            'start_date',
            'created_at',
            'updated_at',
          ],
        },
      ],
      group: ['delivery.id', 'DeliveryProblem.id'],
    });

    return res.json(problems);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { deliveryId } = req.params;

    const deliveryProblems = await DeliveryProblem.findAll({
      where: {
        delivery_id: {
          [Op.eq]: deliveryId,
        },
      },
    });

    if (!deliveryProblems) {
      return res
        .status(400)
        .json({ error: 'There are no problems with this delivery' });
    }

    return res.json(deliveryProblems);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryId } = req.params;

    const delivery = await Order.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery could not be found' });
    }

    if (delivery.end_date) {
      return res
        .status(400)
        .json({ error: 'The order has already been finalized' });
    }

    const { description } = req.body;

    const problems = await DeliveryProblem.create({
      description,
      delivery_id: deliveryId,
    });

    return res.json(problems);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { deliveryProblemId } = req.params;

    const problem = await DeliveryProblem.findByPk(deliveryProblemId);

    if (!problem) {
      return res.status(400).json({ error: 'Problem does not exists' });
    }

    const order = await Order.findOne({
      where: {
        id: {
          [Op.eq]: problem?.delivery_id,
        },
      },
    });

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists' });
    }

    await order.update({
      canceled_at: new Date(),
    });

    order.save();

    const deliveryman = await Deliveryman.findByPk(order.deliveryman_id);

    await Queue.add(CancellationMail.key, {
      deliveryman,
      order,
    });

    return res.json(order);
  }
}

export default new DeliveryProblemController();
