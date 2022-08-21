import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/model/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

export class UsersRepositoryPostgres implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async create(dataRequest: ICreateUserDTO): Promise<void> {
    const { id, name, email, password, driver_license, avatar } = dataRequest;
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      driver_license,
      avatar,
    });
    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}
