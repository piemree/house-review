import { config } from "dotenv";
config();
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { appRouter } from "./routes";
import { createOpenApiExpressMiddleware } from "trpc-openapi";
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from "./openapi";

const app = express();
app.use(cors());
app.use(express.json());

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use('/api', createOpenApiExpressMiddleware({ router: appRouter, createContext }));

// Serve Swagger UI with our OpenAPI schema
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(openApiDocument));

app.listen(4000, () => console.log("Started on http://localhost:4000"));
