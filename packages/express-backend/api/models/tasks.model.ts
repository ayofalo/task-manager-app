import mongoose, { Schema, Document } from "mongoose";

// Define the Task schema
export interface ITask extends Document {
  task: string;
  completed: boolean;
  taskNumber: number;
}

const taskSchema: Schema = new Schema({
  task: String,
  completed: Boolean,
  taskNumber: {
    type: Number,
  },
});

// Define a custom method to generate the auto-incremented taskNumber
taskSchema.statics.generateTaskNumber = async function () {
  const taskCount = await this.countDocuments();
  return taskCount + 1;
};

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
