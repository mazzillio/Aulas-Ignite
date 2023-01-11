import { prisma } from "src/shared/infra/prisma/prisma";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../repositories/ISpecificationsRepository";
import { Specification } from "../model/Specification";

export class SpecificationPostgresRepository
  implements ISpecificationsRepository
{
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification({ name, description });
    const specification_created = await prisma.specification.create({
      data: {
        id: specification.id,
        name: specification.name,
        description: specification.description,
      },
    });
    return specification_created;
  }
  async findByName(name: string): Promise<Specification> {
    return prisma.specification.findFirst({
      where: {
        name,
      },
    });
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    return prisma.specification.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
