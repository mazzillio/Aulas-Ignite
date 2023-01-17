import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserService } from "./listRentalsByUserService";

export class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRentalsByUserService = container.resolve(
      ListRentalsByUserService
    );
    const { id } = req.user;
    const rentals = await listRentalsByUserService.execute(id);
    return res.json(rentals);
  }
}
