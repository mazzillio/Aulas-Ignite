import { Router } from "express";
import { CreateCarController } from "src/modules/cars/useCases/createCar/createCarController";
import { ListAvailableCarsController } from "src/modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdim } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAutheticated";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsAvailable = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdim,
  createCarController.handle
);
carsRoutes.get("/available", listCarsAvailable.handle);

export { carsRoutes };
