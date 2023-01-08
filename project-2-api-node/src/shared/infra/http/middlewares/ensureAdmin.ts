import { NextFunction, Request, Response } from "express";
import { UsersPostgresRepository } from "src/modules/accounts/infra/prisma/UsersPostgresRepository";
import { AppError } from "src/shared/errors/AppError";

export async function ensureAdim(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;
  const usersRepository = new UsersPostgresRepository();
  const user = await usersRepository.findById(id);
  if (!user.isAdmin) {
    throw new AppError("User isn´t admin!");
  }
  return next();
}
