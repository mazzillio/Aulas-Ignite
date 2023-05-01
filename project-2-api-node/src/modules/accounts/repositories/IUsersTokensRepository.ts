import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/model/UserTokens";

export interface IRequestFind {
  user_id: string;
  token: string;
}
export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(data: IRequestFind): Promise<UserTokens>;
}
