import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesReposiroty";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    if (await this.categoriesRepository.findByName(name)) {
      throw new Error("category already exists!");
    }
    await this.categoriesRepository.create({ name, description });
  }
}
