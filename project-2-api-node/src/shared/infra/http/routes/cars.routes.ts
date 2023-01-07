import { Router } from "express";
import { CreateCarController } from "src/modules/cars/useCases/createCar/createCarController";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
