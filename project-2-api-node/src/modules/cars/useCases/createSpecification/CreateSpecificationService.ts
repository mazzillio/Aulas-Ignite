import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsReposiroty";
import { AppError } from "@shared/errors/AppError";

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
      throw new AppError("Specification already exists!");
    }
    await this.specificationsRepository.create({ name, description });
  }
}
