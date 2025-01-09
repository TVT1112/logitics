import React, { useContext, useEffect, useState } from 'react';
import './Chatpage.css';
import { Storecontext } from '../../context/Storecontext';
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from 'react-toastify';

const Chatpage = ({ url }) => {
  const { currentUser } = useContext(Storecontext);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const socket = io(url);

  // Lấy danh sách người dùng
  const fetchAlluser = async () => {
    const response = await axios.get(url + "/api/adminuser/getuser");
    if (response.data.success) {
      // Lọc bỏ người dùng hiện tại khỏi danh sách
      setUsers(response.data.data.filter(user => user._id !== currentUser.id));
    } else {
      toast.error("Lỗi");
    }
  };

  // Lắng nghe tin nhắn mới từ socket
  useEffect(() => {
    fetchAlluser();
    socket.on("new-message", (message) => {
      if (
        (message.sender === currentUser.id && message.receiver === selectedUser?._id) ||
        (message.receiver === currentUser.id && message.sender === selectedUser?._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.disconnect();
  }, [url, currentUser, selectedUser]);

  // Lấy tin nhắn khi chọn người dùng
  const fetchMessge = async () => {
    if (selectedUser) {
      const response = await axios.get(url + `/api/mess/${currentUser.id}/${selectedUser._id}`);
      setMessages(response.data.data);
    }
  };

  useEffect(() => {
    fetchMessge();
  }, [url, currentUser, selectedUser]);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (messageContent.trim() && selectedUser) {
      const message = {
        sender: currentUser.id,
        receiver: selectedUser._id,
        content: messageContent,
      };

      await axios.post(`${url}/api/mess/send`, message);
      setMessageContent("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-users">
        <h3>Người dùng</h3>
        {users.map((user) => (
          <div
            key={user._id}
            className={`user-item ${selectedUser?._id === user._id ? "selected" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            {user.name} : {user.type=="Admin"?<div>Quản lý Admin</div>:<></>} {user.type=="storehouser"?<div>Quản lý Kho</div>:<></>} {user.type=="shipping"?<div>Quản lý Vận chuyển</div>:<></>}
          </div>
        ))}
      </div>

      <div className="chat-messages">
        {selectedUser ? (
          <>
            <h3>Nhắn với {selectedUser.name}</h3>
            <div className="messages-list">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-item ${msg.sender === currentUser.id ? "sent" : "received"}`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <button onClick={sendMessage}>Gửi</button>
            </div>
          </>
        ) : (
          <p>Chọn người để nhắn tin</p>
        )}
      </div>
    </div>
  );
};

export default Chatpage;
