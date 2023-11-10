import request from "supertest";
import app from "../../../server";
import Task from "../../models/tasks.model";

describe("Test GET /tasks", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app).get("/api/tasks/").expect(200);
  });
});

describe("Test POST /tasks", () => {
  const completeTaskData = {
    task: "Create a cupcake",
    completed: true,
  };
  const completeWithoutTaskData = {
    completed: true,
  };

  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send(completeTaskData)
      .expect(201);
  });
  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send(completeWithoutTaskData)
      .expect(400);
  });
});

describe("Test PUT /api/tasks/:taskNumber", () => {
  // Create a task for testing
  let createdTask: any;

  beforeEach(async () => {
    // Create a new task
    const task = new Task({
      task: "Test Task",
      completed: false,
      taskNumber: 200,
    });
    await task.save();
    createdTask = task;
  });

  afterEach(async () => {
    // Clean up by removing the created task
    if (createdTask) {
      await Task.findOneAndDelete(createdTask.taskNumber);
    }
  });

  test("It should update a task", async () => {
    const updatedTaskData = {
      task: "Updated Task",
      completed: true,
    };

    const response = await request(app)
      .put(`/api/tasks/${createdTask.taskNumber}`)
      .send(updatedTaskData)
      .expect(200);
    //Check if the response body matches the updated data
    expect(response.body).toMatchObject(updatedTaskData);

    // Check if the task in the database is also updated
    const updatedTask = await Task.findOne({
      taskNumber: createdTask.taskNumber,
    });

    expect(updatedTask).toMatchObject(updatedTaskData);
  });

  test("It should handle updating a non-existent task", async () => {
    const updatedTaskData = {
      task: "Updated Task",
      completed: true,
    };

    // Use a non-existent taskNumber in the URL
    const nonExistentTaskNumber = 999;

    const response = await request(app)
      .put(`/api/tasks/${nonExistentTaskNumber}`)
      .send(updatedTaskData)
      .expect(404);

    expect(response.body).toEqual({ message: "Task not found" });
  });
});
describe("Test DELETE /api/tasks/:taskNumber", () => {
  // Create a task for testing
  let createdTask: any;

  beforeEach(async () => {
    // Create a new task
    const task = new Task({
      task: "Test Task",
      completed: false,
      taskNumber: 208,
    });
    await task.save();
    createdTask = task;
  });

  afterEach(async () => {
    // Clean up by removing the created task
    if (createdTask) {
      await Task.findOneAndDelete(createdTask.taskNumber);
    }
  });

  test("It should delete a task", async () => {
    const response = await request(app)
      .delete(`/api/tasks/${createdTask.taskNumber}`)
      .expect(200);
  });

  test("It should handle deleting a non-existent task", async () => {
    const nonExistentTaskNumber = 999;

    const response = await request(app)
      .delete(`/api/tasks/${nonExistentTaskNumber}`)
      .expect(404);

    expect(response.body.message).toBe("Task not found");
  });
});
