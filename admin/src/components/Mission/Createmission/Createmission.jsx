import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Createmission.css'
const Createmission = ({url}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      // Lấy danh sách người dùng
      const fetchUsers = async () => {
        const response = await axios.get(`${url}/api/adminuser/getuser`);
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          toast.error("Lỗi khi lấy danh sách người dùng");
        }
      };
      fetchUsers();
      console.log(users)
    }, [url]);
  
    const createTask = async () => {
      try {
        const response = await axios.post(`${url}/api/task/create`, {
          title,
          description,
          assignedTo,
          dueDate
        });
  
        if (response.data.success) {
          toast.success("Tạo nhiệm vụ thành công");
          setTitle("");
          setDescription("");
          setAssignedTo("");
          setDueDate("");
        } else {
          toast.error("Lỗi khi tạo nhiệm vụ");
        }
      } catch (error) {
        toast.error("Lỗi khi gửi yêu cầu");
      }
    };
  
    return (
        <div className="task-create-container">
        <h2 className="task-create-title">Tạo Nhiệm Vụ</h2>
        <div className="task-create-form">
          <input
            className="task-input"
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="task-textarea"
            placeholder="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="task-select"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Chọn người</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          Deadline
          <input
            className="task-date-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="task-create-button" onClick={createTask}>
            Tạo Nhiệm Vụ
          </button>
        </div>
      </div>      
    );
}

export default Createmission