import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/implementations/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/implementations/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationService } from "./CreateCarsSpecificationService";

let createCarSpecificationService: CreateCarSpecificationService;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;
describe("Create car specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationService = new CreateCarSpecificationService(
      carsRepository,
      specificationsRepository
    );
  });
  it("should not be able to add a new specification to a non-existent car", async () => {
    expect(
      createCarSpecificationService.execute({
        car_id: "iahsdj",
        specifications_id: [],
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      name: "gol",
      description: "carro pequeno volks",
      daily_rate: 30,
      license_plate: "jul123",
      brand: "volksvagem",
      fine_amount: 10,
      category_id: "category123",
    });

    const specification = await specificationsRepository.create({
      name: "specification test",
      description: "specification test",
    });
    const carWithSpecification = await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });
    expect(carWithSpecification.specifications.length).toBe(1);
  });
});
