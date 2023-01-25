import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/implementations/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";

describe("Create category", () => {
  let repository: ICategoriesRepository;
  let createCategoryService: CreateCategoryService;
  beforeEach(() => {
    repository = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(repository);
  });
  it("should be able to create a new category", async () => {
    await createCategoryService.execute({
      name: "test category",
      description: "test category descrpition",
    });
    const category = await repository.findByName("test category");
    expect(category).toHaveProperty("id");
  });
  it("should not be able to create a new category with name exists", async () => {
    await createCategoryService.execute({
      name: "test category",
      description: "test category description",
    });
    await expect(
      createCategoryService.execute({
        name: "test category",
        description: "test category description",
      })
    ).rejects.toEqual(new AppError("Category already exists!"));
  });
});
