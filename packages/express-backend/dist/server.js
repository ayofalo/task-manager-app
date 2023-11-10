"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = __importDefault(require("winston"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_1 = __importDefault(require("./swagger"));
const tasks_router_1 = __importDefault(require("./api/routes/tasks/tasks.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Setup Swagger
(0, swagger_1.default)(app);
app.use((0, cors_1.default)({ origin: "http://localhost:3000" })); // Allowing all origins by default.
app.use(express_1.default.json({ limit: "50mb" })); // Parses incoming JSON requests.
app.use(body_parser_1.default.urlencoded({ limit: "100mb", extended: true }));
//app.use("/", apiKeyValidation, articlesRouter);
// Logger configuration
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.simple(),
    transports: [new winston_1.default.transports.Console()],
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// use routes
app.use("/api/tasks", tasks_router_1.default);
// Defined a route to handle requests that don't match any other routes.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    //error.status = 404;
    next(error);
});
// Error handling middleware.
app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(err.status || 500).json({ error: err.message });
});
// DB Config
const db = process.env.MONGO_URI;
mongoose_1.default
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
        else
            next();
    });
    app.use(express_1.default.static("./client/build"));
    app.get("/*", (req, res) => {
        res.sendFile("./client/build/index.html", { root: __dirname });
    });
}
exports.default = app;
