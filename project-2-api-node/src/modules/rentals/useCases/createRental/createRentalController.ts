import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalService } from "./createRentalService";

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { car_id, expected_return_date } = req.body;
    const createRentalUseCase = container.resolve(CreateRentalService);
    const rental = await createRentalUseCase.execute({
      user_id: id,
      car_id,
      expected_return_date,
    });
    return res.status(201).json(rental);
  }
}
