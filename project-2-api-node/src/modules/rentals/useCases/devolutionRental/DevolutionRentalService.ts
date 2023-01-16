import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/models/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  id: string;
}
@injectable()
export class DevolutionRentalService {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ id }: IRequest): Promise<Rental> {
    const minimumDaily = 1;
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new AppError("rental does not exists");
    }
    const car = await this.carsRepository.findById(rental.car_id);
    const dateNow = this.dateProvider.dateNow();

    const quantityDaily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );
    const daily = quantityDaily <= 0 ? minimumDaily : quantityDaily;

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );
    let total = 0;
    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }
    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.update(rental);
    await this.carsRepository.updateAvailable({
      car_id: car.id,
      available: true,
    });
    return rental;
  }
}
