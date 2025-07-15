import "reflect-metadata";
import express from "express";
import { routes } from "./routes";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static(path.resolve(__dirname, "..", "..","..","..", "uploads")));
app.use(routes);
app.use(errorHandler);

export { app };
