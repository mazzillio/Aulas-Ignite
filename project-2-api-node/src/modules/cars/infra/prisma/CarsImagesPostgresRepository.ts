import { prisma } from "../../../../shared/infra/prisma/prisma";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";
import { CarImage } from "../model/CarImage";

export class CarsImagesPostgresRepository implements ICarsImagesRepository {
  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = new CarImage({
      car_id,
      image_name,
    });
    const image = await prisma.imageCar.create({
      data: {
        id: carImage.id,
        image_name: carImage.image_name,
        car: {
          connect: {
            id: car_id,
          },
        },
      },
    });
    return image;
  }
}
