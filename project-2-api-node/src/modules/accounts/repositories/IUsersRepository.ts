import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersRepository {
  create(dataRequest: ICreateUserDTO): Promise<void>;
}
