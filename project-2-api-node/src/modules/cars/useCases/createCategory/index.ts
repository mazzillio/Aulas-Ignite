import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCaltegoryContoller } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryService = new CreateCategoryService(categoriesRepository);
const createCategoryController = new CreateCaltegoryContoller(
  createCategoryService
);

export { createCategoryController };
