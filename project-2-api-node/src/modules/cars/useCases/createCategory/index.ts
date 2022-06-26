import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCaltegoryContoller } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

export default (): CreateCaltegoryContoller => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  const createCategoryController = new CreateCaltegoryContoller(
    createCategoryService
  );
  return createCategoryController;
};
