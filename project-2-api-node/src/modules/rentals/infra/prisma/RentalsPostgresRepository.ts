import { prisma } from "../../../../shared/infra/prisma/prisma";
import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";
import { Rental } from "../models/Rental";

export class RentalsPostgresRepository implements IRentalsRepository {
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return prisma.rentals.findFirst({
      where: {
        car_id,
      },
    });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return prisma.rentals.findFirst({
      where: {
        user_id,
      },
    });
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental({
      user_id,
      car_id,
      expected_return_date,
    });
    const rental_created = await prisma.rentals.create({
      data: {
        id: rental.id,
        expected_return_date: rental.expected_return_date,
        car: {
          connect: {
            id: rental.car_id,
          },
        },
        user: {
          connect: {
            id: rental.user_id,
          },
        },
      },
    });
    return rental_created;
  }
}
