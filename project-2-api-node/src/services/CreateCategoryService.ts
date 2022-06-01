import { CategoriesRepository } from "../repositories/CategoriesRepository";

interface IRequest{
    name:string
    description:string
}
export class CreateCategoryService{
  constructor(private categoriesRepository:CategoriesRepository){}
  execute({name,description}:IRequest): void{
    if(this.categoriesRepository.findByNAme(name)) {
     throw new Error('category already exists!');
    }
    this.categoriesRepository.create({ name,description });
  }
}