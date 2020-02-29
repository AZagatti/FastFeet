import { Router } from 'express';

import auth from 'app/middlewares/auth';
import AdminController from 'app/controllers/AdminController';
import SessionController from 'app/controllers/SessionController';
import RecipientController from 'app/controllers/RecipientController';
import DeliverymanController from 'app/controllers/DeliverymanController';
import OrderController from 'app/controllers/OrderController';
import OpenDeliveryController from 'app/controllers/OpenDeliveryController';
import DeliveredController from 'app/controllers/DeliveredController';
import StartDeliveryController from 'app/controllers/StartDeliveryController';

const routes = Router();

routes.post('/admin', AdminController.store);
routes.post('/sessions', SessionController.store);

routes.get(
  '/deliveryman/:deliverymanId/deliveries',
  OpenDeliveryController.index,
);

routes.get(
  '/deliveryman/:deliverymanId/deliveries/delivered',
  DeliveredController.index,
);

routes.put(
  '/deliveryman/:deliverymanId/deliveries/:deliveryId/start',
  StartDeliveryController.update,
);

routes.use(auth);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

export default routes;
