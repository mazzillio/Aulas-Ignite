import { compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken/index";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

const { sign } = jsonwebtoken;

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
  refresh_token: string;
}
@injectable()
export class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
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
    const token = sign({}, auth.expires_in_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });
    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refresh_token_days
    );
    await this.usersTokenRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id,
    });
    const response: IResponseAuth = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
    return response;
  }
}
