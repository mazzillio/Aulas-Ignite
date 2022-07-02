import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsReposiroty";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateSpecificationService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  execute({ name, description }: IRequest): void {
    if (this.specificationsRepository.findByName(name)) {
      throw new Error("Specification already exists!");
    }
    this.specificationsRepository.create({ name, description });
  }
}
