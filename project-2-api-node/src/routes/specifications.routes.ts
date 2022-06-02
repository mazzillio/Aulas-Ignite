import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/createSpecificationController";
import { CreateSpecificationService } from "../modules/cars/useCases/createSpecification/CreateSpecificationService";



const specificationsRoutes = Router()
specificationsRoutes.post("/",(req, res) =>{
    return createSpecificationController.handle(req,res)
})

export {specificationsRoutes}