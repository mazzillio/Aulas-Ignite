import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/model/User";

export interface IUsersRepository {
  create(dataRequest: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
