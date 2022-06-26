import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryService } from "./ImportCategoryService";

export default () => {
  const categoriesRpository = new CategoriesRepository();
  const importCategoryService = new ImportCategoryService(categoriesRpository);
  const importCategoryController = new ImportCategoryController(
    importCategoryService
  );
  return importCategoryController;
};
