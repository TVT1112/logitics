import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BiSolidCart } from "react-icons/bi";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái để lưu giá trị tìm kiếm
  const [filteredOrders, setFilteredOrders] = useState([]); // Danh sách đơn hàng sau khi lọc

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        setFilteredOrders(response.data.data); // Khởi tạo danh sách đã lọc bằng toàn bộ đơn hàng
      } else {
        toast.error("Lỗi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi lấy danh sách đơn hàng");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật trạng thái đơn hàng");
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(url + `/api/order/delete`, { params: { orderId } });
      if (response.data.success) {
        toast.success("Đã xóa đơn hàng thành công");
        await fetchAllOrders();
      } else {
        toast.error("Lỗi khi xóa đơn hàng");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xóa đơn hàng");
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = orders.filter(order =>
      order.address.ho.toLowerCase().includes(query) || // Tìm theo họ
      order.address.ten.toLowerCase().includes(query) || // Tìm theo tên
      order.address.phone.includes(query) || // Tìm theo số điện thoại
      order.items.some(item => item.name.toLowerCase().includes(query)) // Tìm theo tên sản phẩm
    );
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Trang đơn hàng</h3>
      
      {/* Input tìm kiếm */}
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Tìm kiếm đơn hàng..." 
        value={searchQuery} 
        onChange={handleSearch} 
      />

      {/* Danh sách đơn hàng */}
      {filteredOrders.map((order, index) => (
        <div key={index} className='order-item'>
          <BiSolidCart className='order-icon' />
          <div>
            <p className='order-item-food'>
              {order.items.map((item, idx) => {
                if (idx === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}
            </p>
            <p className='order-item-name'>{order.address.ho + " " + order.address.ten}</p>
            <div className='order-item-address'>
              <p>{order.address.duong + ", " + order.address.phuong + ", " + order.address.city}</p>
            </div>
            <p className='order-item-phone'>{order.address.phone}</p>
          </div>
          <p>Số lượng sản phẩm: {order.items.length}</p>
          <p>{order.amount}.000 vnđ</p>
          <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
            <option value="Đang chuẩn bị">Đang chuẩn bị</option>
            <option value="Đã hết sản phẩm">Đã hết sản phẩm</option>
            <option value="Đã giao thành công">Đã giao thành công</option>
          </select>
          <button className='delete-button' onClick={() => deleteOrder(order._id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
};

export default Order;
