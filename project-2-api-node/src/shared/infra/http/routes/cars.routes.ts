import { Router } from "express";
import { CreateCarController } from "src/modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "src/modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "src/modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdim } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAutheticated";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsAvailable = new ListAvailableCarsController();
const createCarsSpecificationsController =
  new CreateCarSpecificationController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdim,
  createCarController.handle
);
carsRoutes.get("/available", listCarsAvailable.handle);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdim,
  createCarsSpecificationsController.handle
);

export { carsRoutes };
