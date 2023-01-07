import { randomUUID } from "crypto";

interface IPropsCarContructor {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}
export class Car {
  id: string;
  name: string;
  description: string;
  daily_rate: number;
  avaliable = true;
  license_plate: string;
  brand: string;
  fine_amount: number;
  category_id: string;
  created_at: Date;
  constructor({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IPropsCarContructor) {
    this.name = name;
    this.description = description;
    this.daily_rate = daily_rate;
    this.license_plate = license_plate;
    this.fine_amount = fine_amount;
    this.category_id = category_id;
    this.brand = brand;
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
