import React from 'react'
import './Plan.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend} from 'recharts';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import {  Createmission, FileWord, ListTask, Takenote, Target } from '../../components';



const Plan = ({url}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState({});
  const [chartProduct,setProducts]=useState([]);
  const [countorder,setCountorder] = useState(0)
  const [totalAmount,setTotalAmount]= useState(0)
  const [switchbtn,setSwitchbtn] = useState(true);
  const [note,settakenote]=useState(true)

  const togglenote= ()=>{
    settakenote(!note)
  }

  const togglediv = ()=>{
    setSwitchbtn(!switchbtn)
  }


  const fetchStaticsProduct = async ()=>{
    try {
      const response= await axios.get(url+"/api/order/statiticsamount",{params:{startDate,endDate}})
      console.log(response.data.data)
      setProducts(response.data.data)
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }

  }

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(url+"/api/order/statitics", {
        params: { startDate, endDate },
      });

      console.log("API response:", response.data);

      const labels = ["Đang chuẩn bị", "Đã hết sản phẩm", "Đã giao thành công"];
      const counts = labels.map((label) => {
        const found = response.data.data.find((item) => item._id === label);
        return { name: label, count: found ? found.count : 0 };
      });
      setChartData(counts);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCountorder = async ()=>{
    try {
      const response = await axios.get(url + "/api/order/getNumberorder",{params:{startDate,endDate}})
      if(response.data.success){
        setCountorder(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const fetchTotalAmount = async()=>{
    try {
      const response = await axios.get(url + "/api/order/gettotalamount")
      if(response.data.success){
        setTotalAmount(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  useEffect(() => {
    fetchStatistics();
    fetchStaticsProduct()
    fetchCountorder()
    fetchTotalAmount()
    console.log(chartData)
    console.log(chartProduct)
    console.log(countorder)
    console.log(totalAmount)
  }, [startDate, endDate]);


  return (
    <div className='plan'>

      <div className='static'>
      <h2>Trang lên kế hoạch</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Từ ngày:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Đến ngày:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={fetchStatistics}>Lọc</button>
      
        <button onClick={togglediv}>Đổi bảng thống kê</button>

      </div>
      {switchbtn?(
        <div>
        <h3>Trang thống kê đơn hàng theo từng trạng thái</h3>
        <BarChart
          width={800}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fontWeight: "bold" }}
            stroke="#333"
          />
          <YAxis
            tick={{ fontSize: 12, fontWeight: "bold" }}
            stroke="#333"
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
            labelStyle={{ fontWeight: "bold", color: "#333" }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{
              paddingBottom: "10px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          />
          <Bar
            dataKey="count"
            fill="url(#gradient)"
            radius={[10, 10, 0, 0]}
            barSize={50}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </BarChart>
        </div>
      ):(
        <div>
        <h3>Trang thống kê sản phẩm theo số lượng và giá trị đã được bán</h3>
        <BarChart
          width={800}
          height={300}
          data={chartProduct}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fontWeight: "bold" }}
            stroke="#333"
          />
          <YAxis
            tick={{ fontSize: 12, fontWeight: "bold" }}
            stroke="#333"
            allowDecimals={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
            labelStyle={{ fontWeight: "bold", color: "#333" }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{
              paddingBottom: "10px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          />
          <Bar
            dataKey="totalQuantity"
            fill="url(#gradient)"
            radius={[10, 10, 0, 0]}
            barSize={50}
          />
          <Bar
            dataKey="totalValue"
            fill="url(#gradient)"
            radius={[10, 10, 0, 0]}
            barSize={50}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0.4} />
            </linearGradient>
          </defs>
        </BarChart>
        </div>
      )}
      <div className='result_static'>
        <div className='result_count'>
          <p className='p_count'>Tổng số đơn hàng: {countorder}</p>
        </div>
        <div className='result_amount'>
          <p className='p_amount'>Tổng doanh thu: {totalAmount}.000 vnđ</p>
        </div>
      </div>
      <FileWord startDate={startDate} endDate={endDate} chartProduct={chartProduct}/>
        {/* <Target url={url}/> */}
        {/* <button onClick={togglenote}>quản lý mục tiêu nhỏ</button>
        {note?(
          <Takenote url={url}/>
        ):<></>} */}
       

    </div>
    </div>

  
)}

export default Plan