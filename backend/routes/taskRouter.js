import express from "express";
import {
  createTask,
  getTasksByUser,
  updateTaskStatus,
  deleteTask,
  getAlltask
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/create", createTask); // Tạo nhiệm vụ
taskRouter.get("/user/:userId", getTasksByUser); // Lấy nhiệm vụ theo người dùng
taskRouter.get("/listtask",getAlltask)
taskRouter.put("/update-status", updateTaskStatus); // Cập nhật trạng thái
taskRouter.delete("/delete/:taskId", deleteTask); // Xóa nhiệm vụ

export default taskRouter;
