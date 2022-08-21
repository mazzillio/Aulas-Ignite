import { AppError } from "@errors/AppError";
import { UsersRepositoryPostgres } from "@modules/accounts/repositories/implementations/UsersRepositoryPostgres";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}
export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "e00eff7a9665ab9dccdcf1f0444f3da437417f55"
    ) as IPayload;
    const usersRepository = new UsersRepositoryPostgres();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    req.user = {
      id: user_id,
    };
    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
