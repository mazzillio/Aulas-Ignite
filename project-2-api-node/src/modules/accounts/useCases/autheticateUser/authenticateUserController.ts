import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "./authenticateUserService";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const token = await authenticateUserService.execute({
      password,
      email,
    });
    return res.json(token);
  }
}
