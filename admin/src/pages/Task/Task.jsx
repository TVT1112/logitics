import React, { useContext, useEffect, useState } from 'react'
import { Createmission, ListTask } from '../../components'
import './Task.css'
import { Storecontext } from '../../context/Storecontext'
import axios from 'axios'
const Task = ({url}) => {
    const [switchbtn,setSwitchbtn]= useState(true)
    const {type}= useContext(Storecontext)
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
          const response = await axios.get(`${url}/api/task/listtask`);
          if (response.data.success) {
            setTasks(response.data.data);
          } else {
            toast.error("Không thể lấy danh sách nhiệm vụ");
          }
        } catch (error) {
          toast.error("Lỗi khi kết nối API");
        }
      };

    useEffect(()=>{
        fetchTasks()
    })
      return (
    <div className='Task'>
        {type=="Admin"?<div>
        <button className='switchbtn' onClick={()=>setSwitchbtn(false)}>Tạo nhiệm vụ</button>
        <button className='switchbtn' onClick={()=>setSwitchbtn(true)}>Danh sách nhiệm vụ</button>
        {switchbtn?
            (
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
                    
                            </div>
                        ))}
                        </div>
                    )}
                    </div>
            )
        :<Createmission url={url}/>}
        </div>:<></>}
        
        {type=="storehouser"||type=="shipping"?<ListTask url={url}/>:<></>}
        
    </div>
  )
}

export default Task