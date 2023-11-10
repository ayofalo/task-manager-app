import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express, { Express } from "express";
import { boolean } from "yargs";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task manager API Documentation",
      version: "1.0.0",
      description: "Task manager API Documentation",
    },
    components: {
      // Add the components section
      schemas: {
        Task: {
          // Define the Task schema here
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            completed: { type: Boolean },
            taskNumber: { type: Number },
          },
        },
      },
    },
  },
  apis: ["./api/routes/tasks/tasks.router.ts"], // Replace with the path to your route files
};

const specs = swaggerJsdoc(options);

export default function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
