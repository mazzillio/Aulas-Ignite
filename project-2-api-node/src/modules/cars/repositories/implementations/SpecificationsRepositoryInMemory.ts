import { Specification } from "../../infra/model/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  find(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification({
      name,
      description,
    });
    this.specifications.push(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) => {
      return ids.includes(specification.id);
    });
    return specifications;
  }
}
