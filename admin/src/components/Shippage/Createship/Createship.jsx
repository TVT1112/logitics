import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import './Createship.css'
const Createship = ({url}) => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [switchbnt,setSwitch]= useState(false)
    const fetchAllOrders= async ()=>{
        const response = await axios.get(url+"/api/order/list");
        if(response.data.success){
          setOrders(response.data.data)
        }
        else{
          toast.error("Lỗi")
        }
    
      }


    useEffect(()=>{
        fetchAllOrders()
    },[])

    const handleSearch = () => {
        const filtered = orders.filter((order) => {
          const fullName = `${order.address?.ho || ''} ${order.address?.ten || ''}`.toLowerCase();
          const address = `${order.address?.duong || ''} ${order.address?.phuong || ''} ${order.address?.city || ''}`.toLowerCase();
    
          return (
            fullName.includes(searchTerm.toLowerCase()) ||
            address.includes(searchTerm.toLowerCase())
          );
        });
    
        setFilteredOrders(filtered);
        setSwitch(true )
    };

    const handleCreateship = async()=>{
        if(!selectedOrderId){
            toast.error("vui lòng chọn đơn hàng")
             return;
        }

        try {
            const response = await axios.post(url+"/api/ship/createship",{
                orderId: selectedOrderId,
                shipper: shipperInfo,
                vehicle: vehicleInfo,
            })
            toast.success("đơn vận chuyển đã tạo thành công")
        } catch (error) {
            toast.error("lỗi")
        }
    }

    const shipperInfo = {
        name: "Nguyễn Văn A",
        phone: "0123456789",
        email: "nguyenvana@gmail.com",
      };
    
      const vehicleInfo = {
        type: "Xe tải",
        licensePlate: "29A-12345",
      };
  return (
    <div className='createship'>
      <h2 className='title_createship'>Tạo đơn vận chuyển</h2>

      {/* Tìm kiếm */}
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên khách hàng hoặc địa chỉ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='ship_find'
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {/* Hiển thị danh sách đơn hàng */}
      <div>
        <h3>Orders</h3>
        <ul>
        {switchbnt ? (
          filteredOrders.map((order) => (
            <li key={order._id}>
              <input
                type="radio"
                value={order._id}
                checked={selectedOrderId === order._id}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className='tick_ship'
              />
              <div className='ttkhachhang_donhang'>
                <p className='tenkhachhang'>Tên khách hàng: {order.address?.ho} {order.address?.ten}</p>
                <p className='emailkhachhang'>Email khách hàng: {order.address?.email}</p>
                <p className='sodienthoai'>Số điện thoại: {order.address?.phone}</p>
              </div>
              <div className='diachia'>
                <p className='p_diachi'>
                  Địa chỉ nhận hàng: {order.address?.duong}, {order.address?.phuong}, {order.address?.city}
                </p>
              </div>
            </li>
          ))
        ) : (
          orders.map((order) => (
            <li key={order._id}>
              <input
                type="radio"
                value={order._id}
                checked={selectedOrderId === order._id}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className='tick_ship'
              />
              <div className='ttkhachhang_donhang'>
                <p className='tenkhachhang'>Tên khách hàng: {order.address?.ho} {order.address?.ten}</p>
                <p className='emailkhachhang'>Email khách hàng: {order.address?.email}</p>
                <p className='sodienthoai'>Số điện thoại: {order.address?.phone}</p>
              </div>
              <div className='diachia'>
                <p className='p_diachi'>
                  Địa chỉ nhận hàng: {order.address?.duong}, {order.address?.phuong}, {order.address?.city}
                </p>
              </div>
            </li>
          ))
        )}

        </ul>
      </div>

      {/* Nút tạo đơn vận chuyển */}
      <button onClick={handleCreateship} className='createship_btn'>Tạo đơn hàng</button>

    </div>
  )
}

export default Createship