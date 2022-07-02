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

  async execute({ name, description }: IRequest): Promise<void> {
    if (await this.specificationsRepository.findByName(name)) {
      throw new Error("Specification already exists!");
    }
    await this.specificationsRepository.create({ name, description });
  }
}
