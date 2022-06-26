import { Category } from "../model/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}
export interface ICategoriesRepository {
  findByName(naem: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
