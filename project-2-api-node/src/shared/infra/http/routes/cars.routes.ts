import { Router } from "express";
import { CreateCarController } from "src/modules/cars/useCases/createCar/createCarController";

import { ensureAdim } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAutheticated";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdim,
  createCarController.handle
);

export { carsRoutes };
