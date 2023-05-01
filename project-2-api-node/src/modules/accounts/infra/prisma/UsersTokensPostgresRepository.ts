import { prisma } from "../../../../shared/infra/prisma/prisma";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import {
  IRequestFind,
  IUsersTokensRepository,
} from "../../repositories/IUsersTokensRepository";
import { UserTokens } from "../model/UserTokens";

export class UsersTokensPostgresRepository implements IUsersTokensRepository {
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens({
      expires_date,
      user_id,
      refresh_token,
    });
    const userTokenPrisma = await prisma.usersTokens.create({
      data: {
        id: userToken.id,
        expires_date: userToken.expires_date,
        refresh_token: userToken.refresh_token,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
    });
    return userTokenPrisma;
  }
  async findByUserIdAndRefreshToken({
    user_id,
    token,
  }: IRequestFind): Promise<UserTokens> {
    return prisma.usersTokens.findFirst({
      where: {
        AND: {
          refresh_token: token,
          user_id,
        },
      },
    });
  }
}
