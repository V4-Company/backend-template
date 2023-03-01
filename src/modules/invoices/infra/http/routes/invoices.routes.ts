import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/auth';
import InvoicesController from '../controllers/InvoicesController';

const invoicesRouter = Router();
const invoicesController = new InvoicesController();

invoicesRouter.post('/iugu/update', invoicesController.webhook);

invoicesRouter.use(ensureAuthenticated);

invoicesRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      dueDate: Joi.string().required(),
      price: Joi.number().required(),
      status: Joi.string(),
    },
  }),
  invoicesController.create,
);

export default invoicesRouter;
