import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import './Notifications.css';
import {toast}  from 'react-toastify'

const Notifications = ({ url }) => {
  const [notifications, setNotifications] = useState([]);

  // Hàm để lấy thông báo từ localStorage
  const loadNotifications = () => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  };

  // Lưu thông báo vào localStorage
  const saveNotifications = (newNotifications) => {
    localStorage.setItem("notifications", JSON.stringify(newNotifications));
  };


  useEffect(() => {
    loadNotifications(); // Load notifications khi component được render lần đầu
    const socket = io(url); // Thay bằng URL chính xác nếu cần

    socket.on("connect", () => {
      console.log("WebSocket connected: " + socket.id);
    });

    socket.on("new-order", (order) => {
      console.log("New order received:", order);  // Kiểm tra dữ liệu đơn hàng

      // Cập nhật notifications và lưu vào localStorage
      setNotifications((prevNotifications) => {
        const updatedNotifications = [order, ...prevNotifications];
        saveNotifications(updatedNotifications);
        return updatedNotifications;
      });
      toast.success(`Đơn hàng mới từ khách hàng: ${order.userId}`)
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    return () => socket.disconnect();
  }, []);  
  // Hàm xóa thông báo
  const handleDeleteNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  return (
    <div className="notification">
        <h1 className="title-noti">Thông báo đơn hàng</h1>
        <ul className="noti-list">
            {notifications.map((order, index) => (
            <li key={index} className="noti-list-item">
                <div className="noti-item-column">
                <strong>Khách hàng:</strong> {order.userId}
                </div>
                <div className="noti-item-column">
                <strong>Số tiền:</strong> {order.amount}.000 VND
                </div>
                <div className="noti-item-column">
                <strong>Địa chỉ:</strong> {order.address.duong}, {order.address.phuong}, {order.address.city}
                </div>
                <div className="noti-item-column">
                    <strong>Các sản phẩm:</strong>
                    <ul>
                    {order.items.map((item, idx) => (
                        <li key={idx}>
                        <strong>{item.name}</strong> (Số lượng: {item.quantity}, Giá: {item.price}.000 VND)
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="noti-item-column">
                <strong>Ngày đặt:</strong> {new Date(order.date).toLocaleString()}
                </div>
                <div className="noti-item-column">
                <button className='btn-notifi' onClick={() => handleDeleteNotification(index)}>Xóa</button>
                </div>
            </li>
            ))}
        </ul>
        </div>

  );
}

export default Notifications;
