import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import OrdersController from '../controller/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      products: Joi.array().items({
        id: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
    },
  }),
  ordersController.create,
);
ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ordersController.show,
);

export default ordersRouter;
