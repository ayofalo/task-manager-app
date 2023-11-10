import Task, { ITask } from "../../models/tasks.model";
import { Request, Response } from "express";
export interface TodoType {
  taskNumber: number;
  task: string;
  completed: boolean;
}

// Controller getAllTasks

async function getAllTasks(req: Request, res: Response) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function createTask(req: Request, res: Response) {
  const { task, completed } = req.body;

  try {
    // Calculate the taskNumber by finding the last task and incrementing it
    const lastTask = await Task.findOne().sort({ taskNumber: -1 });
    const taskNumber = lastTask ? lastTask.taskNumber + 1 : 1;

    const newTask = new Task({
      task,
      completed,
      taskNumber,
    });

    await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function updateTask(req: Request, res: Response) {
  const taskNumber = Number(req.params.taskNumber);
  const { task, completed } = req.body;

  try {
    // Check if the task exists before attempting to update it
    const updatedTask: ITask | null = await Task.findOneAndUpdate(
      { taskNumber },
      { task, completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      data: { updatedTask, taskNumber },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function deleteTask(req: Request, res: Response) {
  const taskNumber = Number(req.params.taskNumber);
  try {
    // Check if the task exists before attempting to delete it
    const task: ITask | null = await Task.findOneAndDelete({ taskNumber });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

export { getAllTasks, createTask, updateTask, deleteTask };
