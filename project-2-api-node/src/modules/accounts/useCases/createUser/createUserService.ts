import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute(dataCreateRequest: ICreateUserDTO): Promise<void> {
    const { name, email, password, driver_license } = dataCreateRequest;
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const hasedPassword = await hash(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: hasedPassword,
      driver_license,
    });
  }
}
