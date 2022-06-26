import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryService } from "./ImportCategoryService";

const categoriesRpository = null;
const importCategoryService = new ImportCategoryService(categoriesRpository);
const importCategoryController = new ImportCategoryController(
  importCategoryService
);

export { importCategoryController };
