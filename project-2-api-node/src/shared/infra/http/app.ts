import express from "express";
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";

import "../../container";
import swaggerFile from "../../../Swagger.json";
import { middlewareError } from "./middlewares/error";
import { routes } from "./routes/index";

const app = express();

app.use(express.json());
app.use(routes);
app.use(middlewareError);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export { app };
