import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import './Target.css'
import { Storecontext } from '../../context/Storecontext';
const Target = ({url}) => {

    const [targets, setTargets] = useState([]);
    const {type} = useContext(Storecontext)
  const [newTarget, setNewTarget] = useState({ name: '', description: '', startDate: '', endDate: '', status: 'chưa bắt đầu' });

    const fetchTarget = async ()=>{
        try {
            const response = await axios.get(url+'/api/target/get')
            setTargets(response.data.data)
        } catch (error) {
            console.error('Error fetching targets:', error);
        }
    }

    const addTarget = async ()=>{
        try {
            await axios.post(url+"/api/target/add",newTarget)
            fetchTarget()
            setNewTarget({ name: '', description: '', startDate: '', endDate: '', status: 'chưa bắt đầu' });
        } catch (error) {
            console.error('Error fetching targets:', error);
        }
    }

    const updateStatus = async (id,status) =>{
        try {
            await axios.put(url+"/api/target/update",{id,status})
            await fetchTarget()
        } catch (error) {
            console.error('Error fetching targets:', error);
        }
    }

    const deleteTarget= async (id)=>{
        try {
            await axios.delete(url+"/api/target/delete",{params:{id}})
            await fetchTarget()
            console.log(response.data);
          } catch (error) {
            console.error("Lỗi khi xóa mục tiêu:", error);
          }
    }

    useEffect(()=>{
        fetchTarget()
    },[])

  return (
    <div className='target'>
      {type==="Admin"?(
        <div>
        <h3>Thêm mới mục tiêu</h3>
        <input type="text" placeholder="Tên" value={newTarget.name} onChange={(e) => setNewTarget({ ...newTarget, name: e.target.value })} />
        <input type="text" placeholder="Mô tả" value={newTarget.description} onChange={(e) => setNewTarget({ ...newTarget, description: e.target.value })} />
        <input type="date" value={newTarget.startDate} onChange={(e) => setNewTarget({ ...newTarget, startDate: e.target.value })} />
        <input type="date" value={newTarget.endDate} onChange={(e) => setNewTarget({ ...newTarget, endDate: e.target.value })} />
        <button onClick={addTarget}>Thêm mục tiêu</button>
      </div>
      ):<></>}
      
      <h2>Tất cả mục tiêu</h2>
      <table>
        <thead>
          <tr>
            <th>Mục tiêu</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            {type==="Admin"?(
              <th>Hành động</th>
            ):<></>}
            
          </tr>
        </thead>
        <tbody>
          {targets.map((target) => (
            <tr key={target._id}>
              <td>{target.name}</td>
              <td>{target.description}</td>
              <td>{target.status}</td>
              {type==="Admin"?(
                <td>
                <button onClick={() => updateStatus(target._id, 'Đang tiến hành')}>Đang tiến hành</button>
                <button onClick={() => updateStatus(target._id, 'Đã hoàn thành')}>Đã hoàn thành</button>
                <button onClick={() => deleteTarget(target._id)}>Xóa</button>
              </td>
              ):<></>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Target