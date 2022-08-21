import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesReposiroty";

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
      throw new AppError("category already exists!");
    }
    await this.categoriesRepository.create({ name, description });
  }
}
