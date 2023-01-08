import { CarsRepositoryInMemory } from "../../repositories/implementations/CarsRepositoryInMemory";
import { ListAvailableCarsService } from "./ListAvailableCarsService";

let listCarsService: ListAvailableCarsService;
let carsRepository: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsService = new ListAvailableCarsService(carsRepository);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepository.create({
      name: "palio ",
      description: "carro pequeno fiat",
      daily_rate: 30,
      license_plate: "pcg1234",
      brand: "nao sei o que é isso",
      fine_amount: 10,
      category_id: "175c09eb-96de-4b1a-ab98-44ae05a732ab",
    });

    const cars = await listCarsService.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "gol",
      description: "carro pequeno volks",
      daily_rate: 30,
      license_plate: "ola1234",
      brand: "volksvagem",
      fine_amount: 10,
      category_id: "175c09eb-96de-4b1a-ab98-44ae05a732ab",
    });
    const cars = await listCarsService.execute({
      name: "gol",
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    await carsRepository.create({
      name: "palio ",
      description: "carro pequeno fiat",
      daily_rate: 30,
      license_plate: "pcg1234",
      brand: "nao sei o que é isso",
      fine_amount: 10,
      category_id: "175c09eb-96de-4b1a-ab98-44ae05a732ab",
    });
    await carsRepository.create({
      name: "gol",
      description: "carro pequeno volks",
      daily_rate: 30,
      license_plate: "ahoba1234",
      brand: "volksvagem",
      fine_amount: 10,
      category_id: "175c09eb-96de-4b1a-ab98-44ae05a732ab",
    });
    await carsRepository.create({
      name: "gol",
      description: "carro pequeno volks",
      daily_rate: 30,
      license_plate: "ola1234",
      brand: "volksvagem",
      fine_amount: 10,
      category_id: "175c09eb-96de-4b1a-ab98-44ae05a732ab",
    });
    const cars = await listCarsService.execute({
      brand: "volksvagem",
    });
    expect(cars.length).toStrictEqual(2);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepository.create({
      name: "gol",
      description: "carro pequeno volks",
      daily_rate: 30,
      license_plate: "jul123",
      brand: "volksvagem",
      fine_amount: 10,
      category_id: "category123",
    });
    const cars = await listCarsService.execute({
      category_id: "category123",
    });
    expect(cars).toStrictEqual([car]);
  });
});
