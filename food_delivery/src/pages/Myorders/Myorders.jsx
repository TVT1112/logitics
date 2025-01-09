import React, { useContext, useEffect, useState } from 'react';
import './Myorders.css';
import { Storecontext } from '../../context/Storecontext';
import axios from 'axios';
import { BiSolidCart } from "react-icons/bi";
import { toast } from 'react-toastify';

const Myorders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(Storecontext);

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`, 
        {}, 
        { headers: { token } }
      );
      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error("Không thể lấy danh sách đơn hàng");
      }
    } catch (error) {
      toast.error("Lỗi khi kết nối API");
    }
  };

  // Cập nhật trạng thái đơn hàng
  const completedship = async (orderId, status) => {
    try {
      const response = await axios.post(
        `${url}/api/order/status`, 
        { orderId, status },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders(); // Lấy lại danh sách đơn hàng
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái đơn hàng");
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>Đơn của tôi</h2>
      <div className="container">
        {data.length === 0 ? (
          <p>Hiện tại không có đơn hàng nào.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <BiSolidCart className="order-icon" />
              <p>
                {order.items.map((item, idx) => 
                  `${item.name} x ${item.quantity}${idx === order.items.length - 1 ? '' : ', '}`
                )}
              </p>
              <p>{order.amount}.000 vnđ</p>
              <p>Số đơn hàng: {order.items.length}</p>
              <p><b>{order.status}</b></p>
              <button onClick={() => completedship(order._id, "Đã giao thành công")}>
                Đã nhận được hàng
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Myorders;
