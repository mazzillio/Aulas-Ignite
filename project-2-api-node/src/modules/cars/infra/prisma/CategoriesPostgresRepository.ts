import { prisma } from "../../../../shared/infra/prisma/prisma";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../repositories/ICategoriesRepository";
import { Category } from "../model/Category";

export class CategoriesPostgresRepository implements ICategoriesRepository {
  async findByName(name: string): Promise<Category> {
    return prisma.category.findFirst({
      where: {
        name,
      },
    });
  }
  async list(): Promise<Category[]> {
    return prisma.category.findMany();
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category({ name, description });
    await prisma.category.create({
      data: {
        id: category.id,
        description: category.description,
        name: category.name,
      },
    });
  }
}
