import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../model/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create(dataRequest: ICreateUserDTO): Promise<void> {
    const { name, email, password, driver_license } = dataRequest;
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}
