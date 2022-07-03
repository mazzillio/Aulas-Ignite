import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../model/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async create(dataRequest: ICreateUserDTO): Promise<void> {
    const { name, email, password, driver_license } = dataRequest;
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });
    await this.repository.save(user);
  }
}
