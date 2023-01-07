import { v4 as uuid } from "uuid";
interface ICreateCategory {
  name:string;
  description:string;
}
export class Category {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;

  constructor({name, description}:ICreateCategory) {
    this.name = name;
    this.description = description;
    if (!this.id) {
      this.id = uuid();
    }
  }
}
