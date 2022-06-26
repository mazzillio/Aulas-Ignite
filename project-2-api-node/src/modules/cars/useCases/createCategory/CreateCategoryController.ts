import { Request, Response } from "express";

import { CreateCategoryService } from "./CreateCategoryService";

export class CreateCaltegoryContoller {
  constructor(private createCategoryService: CreateCategoryService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    await this.createCategoryService.execute({
      name,
      description,
    });
    return res.status(201).send();
  }
}
