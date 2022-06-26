import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./listCategoriesController";
import { ListCategoriesService } from "./listCategoriesService";

export default (): ListCategoriesController => {
  const repository = new CategoriesRepository();
  const listCategoriesService = new ListCategoriesService(repository);
  const listCategoriesController = new ListCategoriesController(
    listCategoriesService
  );
  return listCategoriesController;
};
