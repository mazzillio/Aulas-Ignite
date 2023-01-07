
import { v4 as uuid } from "uuid";

interface ICreateSpecification {
  name: string;
  description: string;
}

export class Specification {

  id?: string;

  name: string;
 
  description: string;
 
  created_at: Date;

  constructor({ name, description}:ICreateSpecification) {
    this.name = name;
    this. description = description;
    if (!this.id) {
      this.id = uuid();
    }
  }
}
