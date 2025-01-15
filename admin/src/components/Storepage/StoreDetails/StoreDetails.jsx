import React, { useEffect, useState } from 'react'
import Addproduct2store from './Addproduct2store/Addproduct2store'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import './StoreDetails.css'
const StoreDetails = ({url}) => {
  const { state } = useLocation();
  const [list, setList] = useState({});
  const [switchbtn, setSwitch] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStoreProducts = async () => {
    try {
      const response = await axios.get(url + "/api/store/getstorebyname", {
        params: { namestore: state.namestore },
      });

      console.log("API Response Data:", response.data.data);
      if (response.data.success && response.data.data) {
        setList(response.data.data[0]); // Chỉ lấy phần tử đầu tiên nếu là mảng
      } else {
        toast.error("Không thể lấy thông tin nhà kho");
      }
    } catch (error) {
      console.error("Error fetching store products:", error);
      toast.error("Lỗi khi kết nối với server");
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async ( productId) => {
    try {
      const response = await axios.post(url+'/api/store/removelistproduct', {
        storeName:state.namestore,
        productId: productId,
      });
      if (response.data.success) {
        toast.success('Sản phẩm đã được xóa khỏi kho');
        fetchStoreProducts()
        // Cập nhật lại danh sách sản phẩm sau khi xóa
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error removing product from store:', error);
    }
  };

  
  

  useEffect(() => {
    console.log("useEffect triggered with namestore:", state.namestore);
    fetchStoreProducts();
  }, [state.namestore]);

  useEffect(() => {
    console.log("Updated list:", list);
  }, [list]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className='storedetail'>
      <button onClick={() => setSwitch(true)}>Danh sách sản phẩm trong kho</button>
      <button onClick={() => setSwitch(false)}>Thêm sản phẩm vào nhà kho</button>
      
      {switchbtn ? (
        <div>
          <h1>Sản phẩm trong kho: {state.namestore}</h1>

          <div className="list-table-store">
            <div className="list-table-format-store title-store">
              <b>Ảnh</b>
              <b>Tên sản phẩm</b>
              <b>Kiểu sản phẩm</b>
              <b>Giá</b>
              <b>Số lượng</b>
              <b>Xóa khỏi danh sách</b>
            </div>
            {/* Kiểm tra và hiển thị danh sách sản phẩm */}
            {Object.keys(list.listproduct).length > 0 ? (
              Object.entries(list.listproduct).map(([key, item]) => (
                <div key={key} className="list-table-format-store">
                  <img
                    src={`${url}/images/` + item.product.image}
                    alt={item.product.name}
                    
                  />
                  <p>{item.product.name}</p>
                  <p>{item.product.category}</p>
                  <p>{item.product.price}.000vnđ</p>
                  <p>{item.quantity}</p> {/* Hiển thị số lượng sản phẩm */}
                  <p onClick={() => removeProduct(item.product._id)} className="cursor">
                    X
                  </p>
                </div>
              ))
            ) : (
              <div>Không có sản phẩm trong kho</div>
            )}
          </div>
        </div>
      ) : (
        <Addproduct2store url={url} namestore={state.namestore} />
      )}

    </div>
  );
}

export default StoreDetails