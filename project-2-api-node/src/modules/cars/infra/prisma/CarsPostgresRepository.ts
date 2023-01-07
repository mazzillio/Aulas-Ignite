import { prisma } from "src/shared/infra/prisma/prisma";

import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { Car } from "../model/Car";

export class CarsPostgresRepository implements ICarsRepository {
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car(data);
    await prisma.car.create({
      data: {
        id: car.id,
        name: car.name,
        description: car.description,
        avaliable: car.avaliable,
        license_plate: car.license_plate,
        daily_rate: car.daily_rate,
        brand: car.brand,
        fine_amount: car.fine_amount,
        category_id: car.category_id,
      },
    });
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    console.log("lincense_plate", license_plate);
    const car = await prisma.car.findFirst({
      where: {
        license_plate,
      },
    });
    return car;
  }
}