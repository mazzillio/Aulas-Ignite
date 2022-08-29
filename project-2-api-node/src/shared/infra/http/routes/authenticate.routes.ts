import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/autheticateUser/authenticateUserController";

const autheticateUserController = new AuthenticateUserController();
const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", autheticateUserController.handle);

export { authenticateRoutes };
