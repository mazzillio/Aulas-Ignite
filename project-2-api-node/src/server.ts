import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "./database";
import "@shared/container";
import { middlewareError } from "@middlewares/error";

import { routes } from "./routes";
import swaggerFile from "./Swagger.json";

const app = express();

app.use(express.json());
app.use(routes);
app.use(middlewareError);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(3500, () => console.log("serve is open"));
