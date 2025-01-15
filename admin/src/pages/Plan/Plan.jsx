import React, { useState, useEffect } from 'react';
import './Plan.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import axios from 'axios';
import { FileWord } from '../../components';

const Plan = ({ url }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chartData, setChartData] = useState([]);
  const [chartProduct, setChartProduct] = useState([]);
  const [countOrder, setCountOrder] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isOrderStats, setIsOrderStats] = useState(true);
  const [responsetext,setResponsetext]= useState('')

  const toggleStats = () => {
    setIsOrderStats(!isOrderStats);
  };

  const fetchOrderStatistics = async () => {
    try {
      const response = await axios.get(`${url}/api/order/statitics`, {
        params: { startDate, endDate },
      });
      const labels = ["Đang chuẩn bị", "Đã hết sản phẩm", "Đã giao thành công"];
      const formattedData = labels.map((label) => {
        const found = response.data.data.find((item) => item._id === label);
        return { name: label, count: found ? found.count : 0 };
      });
      setChartData(formattedData);
    } catch (error) {
      console.error("Error fetching order statistics:", error);
    }
  };

  const fetchProductStatistics = async () => {
    try {
      const response = await axios.get(`${url}/api/order/statiticsamount`, {
        params: { startDate, endDate },
      });
      setChartProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product statistics:", error);
    }
  };

  const fetchOrderCount = async () => {
    try {
      const response = await axios.get(`${url}/api/order/getNumberorder`, {
        params: { startDate, endDate },
      });
      if (response.data.success) {
        setCountOrder(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching order count:", error);
    }
  };

  const fetchTotalAmount = async () => {
    try {
      const response = await axios.get(`${url}/api/order/gettotalamount`);
      if (response.data.success) {
        setTotalAmount(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching total amount:", error);
    }
  };

  const handlechatbot = async (prompt) => {
    if (!prompt.trim()) return;

  
    try {
      const response = await axios.post(url + '/api/chatbot/generate', { prompt: prompt });
  
      // Lấy văn bản trả về từ kết quả
      setResponsetext(response.data.data);
      console.log(responsetext);  // Văn bản trả về từ API
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };
  

  useEffect(() => {
    fetchOrderStatistics();
    fetchProductStatistics();
    fetchOrderCount();
    fetchTotalAmount();
  }, [startDate, endDate]);

  return (
    <div className="plan">
      <div className="static">
        <h2>Trang lên kế hoạch</h2>
        <div className='filter_day' style={{ marginBottom: "20px" }}>
          <label>
            Từ ngày:
            <input
              className='from_filter'
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            Đến ngày:
            <input
              className='to_filter'
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button className='filter_btn' onClick={fetchOrderStatistics}>Lọc</button>
          <button className='switch_chart' onClick={toggleStats}>Đổi bảng thống kê</button>
        </div>

        {isOrderStats ? (
          <div className='chart'>
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
                wrapperStyle={{ paddingBottom: "10px", fontSize: "14px", fontWeight: "bold" }}
              />
              <Bar
                dataKey="count"
                fill="#8884d8"
                radius={[10, 10, 0, 0]}
                barSize={50}
              />
            </BarChart>

          </div>
        ) : (
          <div className='chart'>
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
                wrapperStyle={{ paddingBottom: "10px", fontSize: "14px", fontWeight: "bold" }}
              />
              <Bar
                dataKey="totalQuantity"
                fill="#82ca9d"
                radius={[10, 10, 0, 0]}
                barSize={50}
              />
              <Bar
                dataKey="totalValue"
                fill="#8884d8"
                radius={[10, 10, 0, 0]}
                barSize={50}
              />
            </BarChart>

          </div>
        )}

        <div className="result_static">
          <div className="result_count">
            <p className="p_count">Tổng số đơn hàng: {countOrder}</p>
          </div>
          <div className="result_amount">
            <p className="p_amount">Tổng doanh thu: {totalAmount}.000 vnđ</p>
          </div>
        </div>

        <FileWord startDate={startDate} endDate={endDate} chartProduct={chartProduct} />
      
      <div className='chatbot_generate'>
      <button onClick={()=>handlechatbot(`Từ các dữ liệu: 
          ${JSON.stringify(chartData)}, 
          ${JSON.stringify(chartProduct)}, 
          Tổng doanh thu: ${totalAmount}.000 vnđ. 
          Hãy lên chiến lược phù hợp trong tương lai với hệ thống logistics này. à vì mình `)}>
        lên kế hoạch
      </button>

      <div className='chatbot_result'>
        {responsetext ? (
          <pre>{responsetext}</pre>
        ) : (
          <p>Hãy bấm vào nút lên kế hoạch để có thể nhờ được sự trợ giúp của chatbot về lên chiến lược.</p>
        )}
      </div>

      </div>
      </div>
    </div>
  );
};

export default Plan;
