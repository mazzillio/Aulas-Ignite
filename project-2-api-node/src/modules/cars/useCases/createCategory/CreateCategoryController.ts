import { Request, Response } from "express";

import { CreateCategoryService } from "./CreateCategoryService";

export class CreateCaltegoryContoller {
  constructor(private createCategoryService: CreateCategoryService) {}
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;
    this.createCategoryService.execute({
      name,
      description,
    });
    return res.status(201).send();
  }
}
