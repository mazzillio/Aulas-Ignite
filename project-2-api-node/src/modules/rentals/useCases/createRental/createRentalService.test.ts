import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/implementations/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalService } from "./createRentalService";

let createRentalService: CreateRentalService;
let rentalsRepository: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let carsRepository: CarsRepositoryInMemory;
describe("Create Rental", () => {
  const date24Hours = dayjs().add(1, "day").toDate();
  beforeAll(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepository = new CarsRepositoryInMemory();
    createRentalService = new CreateRentalService(
      rentalsRepository,
      dateProvider,
      carsRepository
    );
  });
  it("Should be able create a new rental", async () => {
    const car = await carsRepository.create({
      name: "test",
      brand: "brand",
      fine_amount: 100,
      daily_rate: 10,
      description: "description",
      license_plate: "license_plate",
      category_id: "123",
    });
    const rental = await createRentalService.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: date24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental.start_date).not.toBeFalsy();
  });
  it("Should not be able create a new rental if there is another open to the same user", async () => {
    await rentalsRepository.create({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: date24Hours,
    });
    await expect(
      createRentalService.execute({
        user_id: "12345",
        car_id: "126712",
        expected_return_date: date24Hours,
      })
    ).rejects.toEqual(new AppError("There´s rental in progress for user!"));
  });
  it("Should not be able create a new rental if there is another open to the same car", async () => {
    await rentalsRepository.create({
      user_id: "12",
      car_id: "121212",
      expected_return_date: date24Hours,
    });
    expect(
      createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: date24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });
  it("Should not be able create a new rental with invalid return time", async () => {
    await carsRepository.create({
      name: "test",
      brand: "brand",
      fine_amount: 100,
      daily_rate: 10,
      description: "description",
      license_plate: "1415",
      category_id: "123",
    });
    await expect(
      createRentalService.execute({
        user_id: "abc123",
        car_id: "1415",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
