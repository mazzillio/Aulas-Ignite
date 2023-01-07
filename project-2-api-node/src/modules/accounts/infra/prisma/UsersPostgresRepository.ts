import { prisma } from "src/shared/infra/prisma/prisma";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from "../model/User";

export class UsersPostgresRepository implements IUsersRepository {
  async create(dataRequest: ICreateUserDTO): Promise<void> {
    const { name, email, password, avatar, driver_license } = dataRequest;
    const user = new User({
      name,
      email,
      password,
      avatar,
      driver_license,
    });
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        driver_license: user.driver_license,
      },
    });
  }
  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
}
