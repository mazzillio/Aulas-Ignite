import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/implementations/CarsRepositoryInMemory";
import { CreateCarService } from "./CreateCarService";

describe("Create car", () => {
  let createCarService: CreateCarService;
  let carsRepository: CarsRepositoryInMemory;
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarService = new CreateCarService(carsRepository);
  });
  it("should be able create a new car", async () => {
    await createCarService.execute({
      name: "name car",
      description: " desc car",
      daily_rate: 100,
      license_plate: "abc1234",
      fine_amount: 60,
      brand: "brand",
      category_id: "category",
    });
  });
  it("should not be able to create a car with existst license plate", () => {
    expect(async () => {
      await createCarService.execute({
        name: "car1",
        description: " desc car",
        daily_rate: 100,
        license_plate: "abc1234",
        fine_amount: 60,
        brand: "brand",
        category_id: "category",
      });
      await createCarService.execute({
        name: "car2",
        description: " desc car",
        daily_rate: 100,
        license_plate: "abc1234",
        fine_amount: 60,
        brand: "brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
