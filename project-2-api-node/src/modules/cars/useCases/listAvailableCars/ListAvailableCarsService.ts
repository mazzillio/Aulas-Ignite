import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/model/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}
@injectable()
export class ListAvailableCarsService {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}
  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailables(
      brand,
      category_id,
      name
    );
    return cars;
  }
}
