import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAutheticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const createSpecificationController = new CreateSpecificationController();
const specificationsRoutes = Router();
specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  createSpecificationController.handle
);

export { specificationsRoutes };
