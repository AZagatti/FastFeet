import { Response, Request } from 'express';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import {
  parseISO,
  isAfter,
  isBefore,
  setMilliseconds,
  setSeconds,
  setMinutes,
  setHours,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Deliveryman from 'app/models/Deliveryman';
import Order from 'app/models/Order';

class StartDeliveryController {
  public async update(req: Request, res: Response): Promise<Response> {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
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

    if (order.start_date) {
      return res.status(400).json({ error: 'The order has already started' });
    }

    if (order.end_date) {
      return res
        .status(400)
        .json({ error: 'The order has already been finalized' });
    }

    const { start_date } = req.body;

    const parsedDate = parseISO(start_date);

    const eightHour = setMilliseconds(
      setSeconds(setMinutes(setHours(new Date(), 8), 0), 0),
      0,
    );
    const eighteenHour = setMilliseconds(
      setSeconds(setMinutes(setHours(new Date(), 18), 0), 0),
      0,
    );

    if (isBefore(parsedDate, eightHour) || isAfter(parsedDate, eighteenHour)) {
      return res.status(401).json({
        error: 'Delivery is only possible between 8 am and 18 pm',
      });
    }

    const ordersCount = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
    });

    if (ordersCount.length > 5) {
      return res.status(401).json({
        error: 'You can only start five deliveries a day',
      });
    }

    await order.update(req.body);

    return res.json(order);
  }
}

export default new StartDeliveryController();
