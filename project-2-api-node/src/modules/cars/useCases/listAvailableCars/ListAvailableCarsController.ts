import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsService } from "./ListAvailableCarsService";

export class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;
    const listAvailableCarsService = container.resolve(
      ListAvailableCarsService
    );
    const cars = await listAvailableCarsService.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });
    return res.json(cars);
  }
}
