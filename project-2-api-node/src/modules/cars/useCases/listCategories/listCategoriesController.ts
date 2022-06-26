import { Request, Response } from "express";

import { ListCategoriesService } from "./listCategoriesService";

export class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const all = await this.listCategoriesService.execute();
    return res.json(all);
  }
}
