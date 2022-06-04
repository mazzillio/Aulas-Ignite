import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./listCategoriesController";
import { ListCategoriesService } from "./listCategoriesService";

const repository = new CategoriesRepository()
const listCategoriesService = new ListCategoriesService(repository)
const listCategoriesController = new ListCategoriesController(listCategoriesService)

export {listCategoriesController}