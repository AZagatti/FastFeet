import { Router } from 'express';
import multer from 'multer';

import auth from 'app/middlewares/auth';
import AdminController from 'app/controllers/AdminController';
import SessionController from 'app/controllers/SessionController';
import RecipientController from 'app/controllers/RecipientController';
import DeliverymanController from 'app/controllers/DeliverymanController';
import OrderController from 'app/controllers/OrderController';
import OpenDeliveryController from 'app/controllers/OpenDeliveryController';
import DeliveredController from 'app/controllers/DeliveredController';
import StartDeliveryController from 'app/controllers/StartDeliveryController';
import EndDeliveryController from 'app/controllers/EndDeliveryController';
import FileController from 'app/controllers/FileController';
import DeliveryProblemController from 'app/controllers/DeliveryProblemController';

import multerConfig from 'config/multer';

const routes = Router();
const upload = multer(multerConfig);

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

routes.put(
  '/deliveryman/:deliverymanId/deliveries/:deliveryId/end',
  EndDeliveryController.update,
);

routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:deliveryId/problems', DeliveryProblemController.show);
routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);
routes.delete(
  '/problem/:deliveryProblemId/cancel-delivery',
  DeliveryProblemController.delete,
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

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
