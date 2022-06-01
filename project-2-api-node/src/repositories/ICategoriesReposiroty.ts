import { Category } from "../model/Category";
export interface ICreateCategoryDTO{
    name:string
    description:string
}
export interface ICategoriesRepository{
 findByName(naem:string):Category
 list():Category[]
 create({name,description}:ICreateCategoryDTO):void
}