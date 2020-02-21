import { Router } from 'express';

import auth from 'app/middlewares/auth';
import AdminController from 'app/controllers/AdminController';
import SessionController from 'app/controllers/SessionController';
import RecipientController from 'app/controllers/RecipientController';
import DeliverymanController from 'app/controllers/DeliverymanController';

const routes = Router();

routes.post('/admin', AdminController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);

export default routes;
