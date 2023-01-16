import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalService } from "./DevolutionRentalService";

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const devolutionRentalService = container.resolve(DevolutionRentalService);
    const { id } = req.params;
    const rental = await devolutionRentalService.execute({
      id,
    });
    return res.json(rental);
  }
}
