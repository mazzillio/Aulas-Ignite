import { randomUUID } from "node:crypto";

interface IPropsCarImage {
  car_id: string;
  image_name: string;
}

export class CarImage {
  id: string;
  car_id: string;
  image_name: string;
  created_at: Date;
  constructor({ car_id, image_name }: IPropsCarImage) {
    this.car_id = car_id;
    this.image_name = image_name;
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
