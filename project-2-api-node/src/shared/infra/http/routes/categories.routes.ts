import { Router } from "express";
import multer from "multer";

import { CreateCategoryContoller } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/listCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});
const importCategoryController = new ImportCategoryController();
const createCategoryController = new CreateCategoryContoller();
const listCategoriesController = new ListCategoriesController();
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
