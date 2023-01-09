import { Specification } from "@prisma/client";

import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/model/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
    this.cars.push(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }
  async findAvailables(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsAvailables = this.cars.filter((car) => car.avaliable === true);
    if (brand) {
      return carsAvailables.filter((car) => car.brand === brand);
    }
    if (category_id) {
      return carsAvailables.filter((car) => car.category_id === category_id);
    }
    if (name) {
      return carsAvailables.filter((car) => car.name === name);
    }
    return carsAvailables;
  }
  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
  async createSpecifications(
    car: Car,
    specifications: Specification[]
  ): Promise<void> {
    Object.assign(car, {
      specifications,
    });
  }
}
