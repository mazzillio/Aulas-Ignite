import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/model/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesReposiroty";

@injectable()
export class ListCategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}
