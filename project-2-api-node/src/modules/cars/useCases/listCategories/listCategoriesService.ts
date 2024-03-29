import { inject, injectable } from "tsyringe";

import { Category } from "../../infra/model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

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
