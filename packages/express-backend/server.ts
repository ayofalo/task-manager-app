import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import winston from "winston";
import bodyParser from "body-parser";
import setupSwagger from "./swagger";
import tasksRouter from "./api/routes/tasks/tasks.router";

dotenv.config();

const app = express();

// Setup Swagger
setupSwagger(app);

app.use(cors({})); // Allowing all origins by default.
app.use(express.json({ limit: "50mb" })); // Parses incoming JSON requests.
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

//app.use("/", apiKeyValidation, articlesRouter);
// Logger configuration
const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});
// use routes
app.use("/api/tasks", tasksRouter);
// Defined a route to handle requests that don't match any other routes.
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  //error.status = 404;
  next(error);
});

// Error handling middleware.
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  res.status(err.status || 500).json({ error: err.message });
});

// DB Config
const db = process.env.MONGO_URI as string;

mongoose
  .connect(db)
  .then(() => {
    logger.info("MongoDB connected...");

    // Start the server only when the database connection is established
    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}...`);
    });

    // Handle termination signal (SIGINT) to gracefully exit
    process.on("SIGINT", () => {
      logger.info("Server is shutting down...");
      // Perform any cleanup or necessary actions here before exiting
      server.close(() => {
        logger.info("Server has been terminated.");
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    logger.error(error);
    // Handle the error gracefully or take appropriate actions
  });

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https")
      res.redirect(`https://app.salesngine.com${req.url}`);
    else next();
  });
  app.use(express.static("./client/build"));

  app.get("/*", (req, res) => {
    res.sendFile("./client/build/index.html", { root: __dirname });
  });
}
export default app;
