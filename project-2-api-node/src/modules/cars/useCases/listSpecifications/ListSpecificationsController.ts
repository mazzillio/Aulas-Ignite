import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsService } from "./ListSpecificationsService";

export class ListSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationsService = container.resolve(
      ListSpecificationsService
    );
    const specifiations = await listSpecificationsService.execute();
    return res.json(specifiations);
  }
}
