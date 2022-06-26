import { Request, Response } from "express";

import { ImportCategoryService } from "./ImportCategoryService";

export class ImportCategoryController {
  constructor(private importCategoryService: ImportCategoryService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    await this.importCategoryService.execute(file);
    return res.send();
  }
}
