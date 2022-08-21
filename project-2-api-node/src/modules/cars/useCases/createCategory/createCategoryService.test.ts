import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesReposiroty";
import { CategoriesRepositoryInMemory } from "../../repositories/implementations/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";

describe("Create category", () => {
  let repostory: ICategoriesRepository;
  let createCategoryService: CreateCategoryService;
  beforeEach(() => {
    repostory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(repostory);
  });
  it("should be able to create a new category", async () => {
    await createCategoryService.execute({
      name: "test category",
      description: "test category descrpition",
    });
    const category = await repostory.findByName("test category");
    expect(category).toHaveProperty("id");
  });
  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      await createCategoryService.execute({
        name: "test category",
        description: "test category descrpition",
      });
      await createCategoryService.execute({
        name: "test category",
        description: "test category descrpition",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
