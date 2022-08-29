import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAutheticated";

const createSpecificationController = new CreateSpecificationController();
const specificationsRoutes = Router();
specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  createSpecificationController.handle
);

export { specificationsRoutes };
