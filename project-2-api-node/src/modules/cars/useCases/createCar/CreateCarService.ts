import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/model/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

@injectable()
export class CreateCarService {
  constructor(
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specification_id,
  }: ICreateCarDTO): Promise<Car> {
    const carAreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );
    if (carAreadyExists) {
      throw new AppError("Car already exists!");
    }
    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specification_id,
    });
    return car;
  }
}
