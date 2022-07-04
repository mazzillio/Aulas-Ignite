import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarService } from "./updateUserAvatarService";

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatarFile = req.file.filename;
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    await updateUserAvatarService.execute({ id, avatarFile });
    return res.status(204).send();
  }
}
