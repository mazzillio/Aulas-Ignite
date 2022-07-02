import express from "express";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container";
import { routes } from "./routes";
import swaggerFile from "./Swagger.json";

const app = express();

app.use(express.json());
app.use(routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(3500, () => console.log("serve is open"));
