import { Router } from "express";
import { ListSpecificationsController } from "src/modules/cars/useCases/listSpecifications/ListSpecificationsController";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();
const specificationsRoutes = Router();
specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
