import express, { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./tasks.controller";
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with provided data
 *     parameters:
 *       - in: body
 *         task: Task data to create
 *         completed: status
 *         required: true
 *     responses:
 *       201:
 *         description: Task created
 *         schema:
 *           $ref: '#/definitions/Task'
 *       400:
 *         description: Bad request, missing data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/tasks/{taskNumber}:
 *   put:
 *     summary: Update a task
 *     description: Update an existing task with provided data
 *     parameters:
 *       - in: path
 *         taskNumber: taskNumber
 *         task: Task data to create
 *         completed: status
 *         required: true
 *       - in: body
 *         task: Updated task data
 *         required: true
 *
 *     responses:
 *       200:
 *         description: Task updated
 *         schema:
 *           $ref: '#/definitions/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by task number
 *     parameters:
 *       - in: path
 *         task: The task number to delete
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

const tasksRouter: Router = express.Router();

//tasksrouter
tasksRouter.get("/", getAllTasks);
tasksRouter.post("/", createTask);
tasksRouter.put("/:taskNumber", updateTask);
tasksRouter.delete("/:taskNumber", deleteTask);

export default tasksRouter;
