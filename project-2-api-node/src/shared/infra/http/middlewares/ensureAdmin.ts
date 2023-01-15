import { NextFunction, Request, Response } from "express";

import { UsersPostgresRepository } from "../../../../modules/accounts/infra/prisma/UsersPostgresRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAdmin(
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
