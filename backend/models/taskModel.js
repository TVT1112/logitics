import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "adminuser", required: true },
  status: { type: String, default: "Pending" },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const taskModel = mongoose.model.task || mongoose.model("task", taskSchema);

export default taskModel;
