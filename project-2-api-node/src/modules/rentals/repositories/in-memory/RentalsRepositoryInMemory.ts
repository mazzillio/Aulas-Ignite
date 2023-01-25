import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/models/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental({
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });
    this.rentals.push(rental);
    return rental;
  }
  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
  async update(rental: Rental): Promise<void> {
    const index = this.rentals.indexOf(rental);
    this.rentals[index] = rental;
  }
}
