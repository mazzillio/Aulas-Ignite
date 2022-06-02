import { SpecificationsRepository } from "../../repositories/SpecificationsRepository"
import { CreateSpecificationController } from "./createSpecificationController"
import { CreateSpecificationService } from "./CreateSpecificationService"

const specificationRepositrory = new SpecificationsRepository()
const createSpecificationService = new CreateSpecificationService(specificationRepositrory)
const createSpecificationController = new CreateSpecificationController(createSpecificationService)

export { createSpecificationController }