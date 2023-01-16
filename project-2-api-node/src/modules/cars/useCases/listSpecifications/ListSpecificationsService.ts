import { inject, injectable } from "tsyringe";

import { Specification } from "../../infra/model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationsService {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}
  async execute(): Promise<Specification[]> {
    return this.specificationRepository.find();
  }
}
