import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../Errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequestAuth {
  email: string;
  password: string;
}
interface IResponseAuth {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
export class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequestAuth): Promise<IResponseAuth> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect!");
    }
    const passwordMath = await compare(password, user.password);
    if (!passwordMath) {
      throw new AppError("Email or password incorrect!");
    }
    const token = sign({}, "e00eff7a9665ab9dccdcf1f0444f3da437417f55", {
      subject: user.id,
      expiresIn: "2h",
    });
    const response: IResponseAuth = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
    return response;
  }
}
