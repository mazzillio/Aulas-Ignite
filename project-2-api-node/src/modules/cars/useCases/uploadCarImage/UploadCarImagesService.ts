import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}
@injectable()
export class UploadCarImagesService {
  constructor(
    @inject("CarsImageRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}
  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.forEach(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
