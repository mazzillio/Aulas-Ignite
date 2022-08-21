import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserService } from "@modules/accounts/useCases/createUser/createUserService";
import { AppError } from "@shared/errors/AppError";

import { AuthenticateUserService } from "./authenticateUserService";

describe("Authenticate user", () => {
  let usersRepository: IUsersRepository;
  let createUserService: CreateUserService;
  let authenticateUserService: AuthenticateUserService;
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersRepository);
    authenticateUserService = new AuthenticateUserService(usersRepository);
  });
  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "test",
      email: "user@test.com",
      password: "1234",
      driver_license: "0001234",
    };
    await createUserService.execute(user);
    const responseAuth = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });
    expect(responseAuth).toHaveProperty("token");
  });
  it("should not be able authenticated a non existsent user", async () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: "algum@email.com",
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able authenticated a password incorrect", () => {
    const user: ICreateUserDTO = {
      name: "userTest",
      email: "algum@email.com",
      password: "1234",
      driver_license: "0001234",
    };
    expect(async () => {
      await createUserService.execute(user);
      await authenticateUserService.execute({
        email: user.email,
        password: "123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
