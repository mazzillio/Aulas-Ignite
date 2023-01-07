
import { v4 as uuid } from "uuid";

interface propsCreateUser {
  name: string;
  email:string;
  password: string;
  driver_license:string;
  isAdmin?:boolean;
  avatar?:string;
}

export class User {
 
  id: string;
  name: string;
  email: string;
  password: string;
  driver_license: string;
  isAdmin: boolean;
  avatar: string;
  created_at: Date;
  constructor({ name, email, password, driver_license, isAdmin, avatar }:propsCreateUser) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.driver_license = driver_license;
    if (!this.id) {
      this.id = uuid();
      this.isAdmin = isAdmin ?? false;
    }
    if(avatar) {
      this.avatar = avatar;
    }
  }
}
