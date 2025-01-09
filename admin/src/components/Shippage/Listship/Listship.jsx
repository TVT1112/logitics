import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import "./Listship.css"
const Listship = ({url}) => {
    const [shipments, setShipments] = useState([]);
    const [filteredShipments, setFilteredShipments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllship= async ()=>{
        const response =await axios.get(url + "/api/ship/listship")
        if(response.data.success){
            setShipments(response.data.data)
            setFilteredShipments(response.data.data)
        }
        else{
            toast.error("Lỗi");
        }
    }

    useEffect(()=>{
        fetchAllship()
    },[])

    const handleSearch = () => {
        const filtered = shipments.filter((shipment) => {
          const fullName = `${shipment.address?.ho || ''} ${shipment.address?.ten || ''}`.toLowerCase();
          return fullName.includes(searchTerm.toLowerCase());
        });
    
        setFilteredShipments(filtered);
    };

    const statusHandler = async (event, shipId) => {
      const newStatus = event.target.value;
      console.log(event,shipId)
      try {
        const response = await axios.post(url +"/api/ship/updatestatus", {
          shipId,
          status: newStatus
        });
    
        if (response.data.success) {
          await fetchAllship(); // Cập nhật lại danh sách đơn sau khi thay đổi trạng thái
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi cập nhật trạng thái.");
      }
    }

    const deleteShip = async (shipId)=>{
      try {
        const response = await axios.delete(url + "/api/ship/delete",{
          params:{shipId}
        })
        if(response.data.data){
          
          toast.success("đã hủy đơn vận chuyển thành công")
          await fetchAllship()
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi cập nhật trạng thái.")
      }
    }

    return (
        <div className='shipment-list'>
        <h2 className='title_shipment-list'>Danh sách đơn vận chuyển</h2>
  
        {/* Tìm kiếm */}
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khách hàng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='shipment-find'
          />
          <button className='btn_search' onClick={handleSearch}>Tìm kiếm</button>
        </div>
  
        {/* Hiển thị danh sách đơn vận chuyển */}
        <div className='list_container'>
          <h3 className='title_list'>Danh sách đơn vận chuyển</h3>
          <ul className='list_ship'>
            {filteredShipments.map((shipment) => (
              <li key={shipment._id} className='list_item'>
                <div className='shipment-item'>
                  <p className='shipment-customer-name'>
                    <strong>Tên khách hàng: </strong>{shipment.address?.ho} {shipment.address?.ten}
                  </p>
                  <p className='email_client'><strong>Email: </strong>{shipment.address?.email}</p>
                  <p className='phone_client'><strong>Số điện thoại: </strong>{shipment.address?.phone}</p>
                  <p className='diachi_client'><strong>Địa chỉ nhận hàng: </strong>{shipment.address?.duong}, {shipment.address?.phuong}, {shipment.address?.city}</p>
                  <p className='status_ship'><strong>Trạng thái: </strong>{shipment.status}</p>
                  <p className='dayship'><strong>Ngày vận chuyển: </strong>{new Date(shipment.shipmentDate).toLocaleDateString()}</p>
                  <select className='select_ship' onChange={(event) => statusHandler(event, shipment._id)} value={shipment.status}>
                    <option className='ship_option' value="Chưa vận chuyển">Chưa vận chuyển</option>
                    <option className='ship_option' value="Đang giao hàng">Đang Giao hàng</option>
                    <option className='ship_option' value="Đã giao thành công">Đã giao thành công</option>
                    <option className='ship_option' value="Hủy đơn hàng vận chuyển" onClick={()=>deleteShip(shipment._id)}>Hủy đơn hàng vận chuyển</option>
                  </select>
                  <p className='btn_delete' onClick={()=>deleteShip(shipment._id)}>xóa</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
}

export default Listship