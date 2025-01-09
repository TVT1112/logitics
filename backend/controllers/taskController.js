import taskModel from "../models/taskModel.js";
import adminuserModel from '../models/adminuserModel.js'

const createTask = async (req,res) =>{
    try {
        const { title, description, assignedTo, dueDate } = req.body;
    
        // Kiểm tra người dùng có tồn tại không
        const user = await adminuserModel.findById(assignedTo);
        if (!user) {
          return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }
    
        const newTask = new taskModel({
          title,
          description,
          assignedTo,
          dueDate
        });
    
        await newTask.save();
        res.json({ success: true, message: "Tạo nhiệm vụ thành công", data: newTask });
      } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Lỗi khi tạo nhiệm vụ" });
      }
}

const getAlltask = async (req,res) =>{
    try {
        const listtask= await taskModel.find()
        res.json({ success: true, data: listtask });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Lỗi khi lấy danh sách nhiệm vụ" });
    }
}

// Lấy danh sách nhiệm vụ theo người dùng
const getTasksByUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const tasks = await taskModel.find({ assignedTo: userId });
      res.json({ success: true, data: tasks });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Lỗi khi lấy danh sách nhiệm vụ" });
    }
  };
  
  // Cập nhật trạng thái nhiệm vụ
  const updateTaskStatus = async (req, res) => {
    try {
      const { taskId, status } = req.body;
  
      const updatedTask = await taskModel.findByIdAndUpdate(
        taskId,
        { status },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ success: false, message: "Không tìm thấy nhiệm vụ" });
      }
  
      res.json({ success: true, message: "Cập nhật trạng thái thành công", data: updatedTask });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Lỗi khi cập nhật trạng thái nhiệm vụ" });
    }
  };
  
  // Xóa nhiệm vụ
  const deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const deletedTask = await taskModel.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ success: false, message: "Không tìm thấy nhiệm vụ" });
      }
  
      res.json({ success: true, message: "Xóa nhiệm vụ thành công" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Lỗi khi xóa nhiệm vụ" });
    }
  };
  
export { createTask, getTasksByUser, updateTaskStatus, deleteTask ,getAlltask};