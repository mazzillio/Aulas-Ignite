import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CreateCaltegoryContoller } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

const categoriesRepository = new CategoriesRepository();
const createCategoryService = new CreateCategoryService(categoriesRepository)
const createCategoryController= new CreateCaltegoryContoller(createCategoryService)

export {createCategoryController}