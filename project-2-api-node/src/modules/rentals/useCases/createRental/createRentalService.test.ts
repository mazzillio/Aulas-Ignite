import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalService } from "./createRentalService";

let createRentalService: CreateRentalService;
let rentalsRepository: RentalsRepositoryInMemory;
describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalService = new CreateRentalService(rentalsRepository);
  });
  it("Should be able create a new rental", async () => {
    const rental = await createRentalService.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: new Date(),
    });
    expect(rental).toHaveProperty("id");
    expect(rental.start_date).not.toBeFalsy();
  });
  it("Should not be able create a new rental if there is anoter open to the same user", async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: new Date(),
      });
      await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able create a new rental if there is anoter open to the same car", async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: "12",
        car_id: "121212",
        expected_return_date: new Date(),
      });
      await createRentalService.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
