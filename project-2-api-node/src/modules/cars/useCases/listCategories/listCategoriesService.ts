import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesReposiroty";

export class ListCategoriesService {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}
