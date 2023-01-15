import { prisma } from "../../../../shared/infra/prisma/prisma";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { Car } from "../model/Car";
import { Specification } from "../model/Specification";

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
    const car = await prisma.car.findFirst({
      where: {
        license_plate,
      },
      include: {
        specifications: true,
      },
    });
    return car;
  }
  async findAvailables(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    if (brand) {
      return prisma.car.findMany({
        where: {
          avaliable: true,
          brand,
        },
        include: {
          specifications: true,
        },
      });
    }
    if (category_id) {
      return prisma.car.findMany({
        where: {
          avaliable: true,
          category_id,
        },
        include: {
          specifications: true,
        },
      });
    }
    if (name) {
      return prisma.car.findMany({
        where: {
          avaliable: true,
          name,
        },
        include: {
          specifications: true,
        },
      });
    }
    return prisma.car.findMany({
      where: {
        avaliable: true,
      },
      include: {
        specifications: true,
      },
    });
  }
  async findById(id: string): Promise<Car> {
    return prisma.car.findFirst({
      where: {
        id,
      },
      include: {
        specifications: true,
      },
    });
  }
  async createSpecifications(
    car: Car,
    specifcations: Specification[]
  ): Promise<void> {
    const updates = [];
    specifcations.forEach((specifcation) => {
      updates.push(
        prisma.car.update({
          where: {
            id: car.id,
          },
          data: {
            specifications: {
              connect: {
                id: specifcation.id,
              },
            },
          },
        })
      );
    });
    await Promise.all(updates);
  }
}
