import { ICategoriesRepository } from "../../repositories/ICategoriesReposiroty";
import { CategoriesRepositoryInMemory } from "../../repositories/implementations/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";

describe("Create category", () => {
    let repostory: ICategoriesRepository;
    let createCategory: CreateCategoryService;
    beforeAll(() => {

        repostory = new CategoriesRepositoryInMemory();
        createCategory = new CreateCategoryService(repostory);
    })
  it("should be able to create a new category", () => {});
});
