import { Router } from 'express';

import auth from 'app/middlewares/auth';
import UserController from 'app/controllers/UserController';
import SessionController from 'app/controllers/SessionController';
import RecipientController from 'app/controllers/RecipientController';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
