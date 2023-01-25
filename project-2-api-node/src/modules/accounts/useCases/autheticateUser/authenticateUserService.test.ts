import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserService } from "../createUser/createUserService";
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
  it("should not be able authenticated a non existent user", async () => {
    await expect(
      authenticateUserService.execute({
        email: "algum@email.com",
        password: "123",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
  it("should not be able authenticated a password incorrect", async () => {
    const user: ICreateUserDTO = {
      name: "userTest",
      email: "algum@email.com",
      password: "1234",
      driver_license: "0001234",
    };
    await createUserService.execute(user);
    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: "123",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
