import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationService } from "./CreateCarsSpecificationService";

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCarSpecificationService = container.resolve(
      CreateCarSpecificationService
    );
    const { id } = req.params;
    const { specifications_id } = req.body;
    const cars = await createCarSpecificationService.execute({
      car_id: id,
      specifications_id,
    });
    return res.json(cars);
  }
}
