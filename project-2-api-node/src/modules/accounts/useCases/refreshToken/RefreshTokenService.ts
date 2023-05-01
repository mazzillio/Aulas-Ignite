import jsonwebtoken from "jsonwebtoken/index";
import { inject } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
}
const { verify } = jsonwebtoken;
export class RefreshTokenService {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}
  async execute(token: string) {
    const decode = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = decode.sub;
    const user_tokens =
      await this.usersTokensRepository.findByUserIdAndRefreshToken({
        user_id,
        token,
      });
    if (!user_tokens) {
      throw new AppError("Refresh Token does not exists!");
    }
  }
}
