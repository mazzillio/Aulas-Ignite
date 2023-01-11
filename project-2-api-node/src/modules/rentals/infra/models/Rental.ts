import { randomUUID } from "node:crypto";

interface IPropsRental {
  id?: string;
  car_id: string;
  user_id: string;
  expected_return_date: Date;
  start_date?: Date;
  end_date?: Date;
  total?: number;
  created_at?: Date;
  updated_at?: Date;
}
export class Rental {
  id: string;
  car_id: string;
  user_id: string;
  start_date: Date;
  end_date: Date;
  expected_return_date: Date;
  total: number;
  created_at: Date;
  updated_at: Date;
  constructor({
    car_id,
    user_id,
    expected_return_date,
    start_date,
  }: IPropsRental) {
    this.car_id = car_id;
    this.user_id = user_id;
    this.expected_return_date = expected_return_date;
    this.start_date = start_date ?? null;
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
