import { generateOpenApiDocument } from "trpc-openapi";
import { appRouter } from "./routes";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Kiracıma SOR API",
  description: "Kiracıma SOR API Documentation",
  version: "1.0.0",
  baseUrl: "http://localhost:4000/trpc",
  // tags: ["Auth", "User", "Question", "Answer", "Comment"],
});
