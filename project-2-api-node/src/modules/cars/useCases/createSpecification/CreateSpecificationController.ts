import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationService } from "./CreateSpecificationService";

export class CreateSpecificationController {
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;
    const createSpecificationService = container.resolve(
      CreateSpecificationService
    );
    createSpecificationService.execute({ name, description });
    return res.status(201).send();
  }
}
