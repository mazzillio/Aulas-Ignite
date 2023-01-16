import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/createRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.use(ensureAuthenticated);
rentalRoutes.post("/", createRentalController.handle);
rentalRoutes.post("/devolution/:id", devolutionRentalController.handle);

export { rentalRoutes };
