import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Storecontext } from "../../../context/Storecontext";
import "./ListTask.css";

const ListTask = ({ url }) => {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useContext(Storecontext);

  // Lấy danh sách nhiệm vụ từ API
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${url}/api/task/user/${currentUser.id}`);
      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        toast.error("Không thể lấy danh sách nhiệm vụ");
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối API");
    }
  };

  // Cập nhật trạng thái nhiệm vụ
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/task/update-status`, {
        taskId,
        status: newStatus,
      });
      if (response.data.success) {
        toast.success("Cập nhật trạng thái thành công");
        fetchTasks(); // Lấy lại danh sách nhiệm vụ sau khi cập nhật
      } else {
        toast.error("Không thể cập nhật trạng thái");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  // Xóa nhiệm vụ
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${url}/api/task/delete/${taskId}`);
      if (response.data.success) {
        toast.success("Xóa nhiệm vụ thành công");
        fetchTasks(); // Lấy lại danh sách nhiệm vụ sau khi xóa
      } else {
        toast.error("Không thể xóa nhiệm vụ");
      }
    } catch (error) {
      toast.error("Lỗi khi xóa nhiệm vụ");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [url, currentUser]);

  return (
    <div className="task-list-container">
      <h2>Danh Sách Nhiệm Vụ</h2>
      {tasks.length === 0 ? (
        <p>Hiện tại không có nhiệm vụ nào</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task._id} className={`task-item task-${task.status.toLowerCase()}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Hạn chót: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>
                Trạng thái: <strong>{task.status}</strong>
              </p>
              <div className="task-actions">
                {/* Nút cập nhật trạng thái */}
                <select
                  className="status-select"
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                >
                  <option value="Pending">Chưa hoàn thành</option>
                  <option value="InProgress">Đang thực hiện</option>
                  <option value="Completed">Hoàn thành</option>
                </select>
                {/* Nút xóa */}
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task._id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListTask;
