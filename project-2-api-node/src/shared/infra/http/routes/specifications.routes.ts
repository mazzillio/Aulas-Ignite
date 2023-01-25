import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();
const specificationsRoutes = Router();
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
