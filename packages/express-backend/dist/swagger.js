"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
const specs = (0, swagger_jsdoc_1.default)(options);
function setupSwagger(app) {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
}
exports.default = setupSwagger;
