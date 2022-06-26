import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./listCategoriesController";
import { ListCategoriesService } from "./listCategoriesService";

const repository = null;
const listCategoriesService = new ListCategoriesService(repository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesService
);

export { listCategoriesController };
