import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "./createUserService";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, email, password, driver_license } = req.body;
    const createUserService = container.resolve(CreateUserService);
    await createUserService.execute({
      name,
      username,
      email,
      password,
      driver_license,
    });
    return res.status(201).end();
  }
}
