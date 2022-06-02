import { Request, Response } from "express";
import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { CreateSpecificationService } from "./CreateSpecificationService";

export class CreateSpecificationController {
    constructor(private createSpecificationService:CreateSpecificationService){}
    handle(req: Request, res: Response): Response {
        const { name, description } = req.body 
        this.createSpecificationService.execute({ name, description })
        return res.status(201).send()
    }
}