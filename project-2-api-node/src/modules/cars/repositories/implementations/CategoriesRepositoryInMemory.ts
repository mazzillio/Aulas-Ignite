import { Category } from "../../infra/model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesReposiroty";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category({ name, description});
    this.categories.push(category);
  }
}
