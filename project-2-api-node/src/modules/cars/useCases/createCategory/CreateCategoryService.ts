import { ICategoriesRepository } from "../../repositories/ICategoriesReposiroty";

interface IRequest{
    name:string
    description:string
}
export class CreateCategoryService{
  constructor(private categoriesRepository:ICategoriesRepository){}
  execute({name,description}:IRequest): void{
    if(this.categoriesRepository.findByName(name)) {
     throw new Error('category already exists!');
    }
    this.categoriesRepository.create({ name,description });
  }
}