import { Router } from "express";
import multer from "multer";
import uploadConfig from "src/config/upload";
import { CreateCarController } from "src/modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "src/modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "src/modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "src/modules/cars/useCases/uploadCarImage/UploadCarImagesController";

import { ensureAdim } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAutheticated";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsAvailable = new ListAvailableCarsController();
const createCarsSpecificationsController =
  new CreateCarSpecificationController();
const uploadCarsImagesController = new UploadCarImagesController();
const uploadImage = multer(uploadConfig.upload("./tmp/cars"));
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
carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdim,
  uploadImage.array("images"),
  uploadCarsImagesController.handle
);

export { carsRoutes };
