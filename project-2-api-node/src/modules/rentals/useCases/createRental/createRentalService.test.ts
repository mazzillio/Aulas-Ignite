import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalService } from "./createRentalService";

let createRentalService: CreateRentalService;
let rentalsRepository: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
describe("Create Rental", () => {
  const date24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalService = new CreateRentalService(
      rentalsRepository,
      dateProvider
    );
  });
  it("Should be able create a new rental", async () => {
    const rental = await createRentalService.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: date24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental.start_date).not.toBeFalsy();
  });
  it("Should not be able create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: date24Hours,
      });
      await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: date24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: "12",
        car_id: "121212",
        expected_return_date: date24Hours,
      });
      await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: date24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
