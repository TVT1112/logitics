import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./Addproduct2store.css"

const AddProductsToStore = ({ url, namestore }) => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm từ cơ sở dữ liệu
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm được chọn
  const [quantity, setQuantity] = useState(1); // Số lượng của sản phẩm được chọn
  const [productsToAdd, setProductsToAdd] = useState([]); // Danh sách sản phẩm sẽ được thêm vào nhà kho

  // Fetch danh sách sản phẩm từ server
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error('Không thể tải danh sách sản phẩm.');
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách sản phẩm:', error);
      toast.error('Có lỗi xảy ra khi tải danh sách sản phẩm.');
    }
  };

  // Thêm sản phẩm vào danh sách sẽ thêm vào nhà kho
  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0) {
      toast.error('Vui lòng chọn sản phẩm và số lượng hợp lệ.');
      return;
    }

    setProductsToAdd((prev) => {
      const existingProduct = prev.find(
        (product) => product.productId === selectedProduct._id
      );
      if (existingProduct) {
        return prev.map((product) =>
          product.productId === selectedProduct._id
            ? { ...product, quantity: product.quantity + quantity }
            : product
        );
      }
      return [
        ...prev,
        { productId: selectedProduct._id,image:selectedProduct.image, name: selectedProduct.name, quantity },
      ];
    });

    setSelectedProduct(null);
    setQuantity(1);
  };

  // Gửi danh sách sản phẩm lên server để thêm vào nhà kho
  const handleAddToStore = async () => {
    if (productsToAdd.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm.');
      return;
    }

    try {
      const response = await axios.put(`${url}/api/store/updatestoredetail`, {
        namestore,
        products: productsToAdd,
      });

      if (response.data.success) {
        toast.success('Sản phẩm đã được thêm vào nhà kho thành công!');
        setProductsToAdd([]);
      } else {
        toast.error(response.data.message || 'Có lỗi xảy ra khi thêm sản phẩm.');
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào nhà kho:', error);
      toast.error('Có lỗi xảy ra khi thêm sản phẩm.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='addproduct2store'>
      <h1 className='title-add2store'>Thêm Sản Phẩm Vào Nhà Kho</h1>

      {/* Dropdown chọn sản phẩm */}
      <div className='selectproduct'>
        <label>Chọn sản phẩm:</label>
        <select className='select-item'
          value={selectedProduct ? selectedProduct._id : ''}
          onChange={(e) => {
            const product = products.find(
              (product) => product._id === e.target.value
            );
            setSelectedProduct(product);
          }}
        >
          <option value="" >-- Chọn sản phẩm --</option>
          {products.map((product) => (
            <option className='option-item' key={product._id} value={product._id}>
              {product.name} - {product.price} VND
            </option>
          ))}
        </select>
      </div>

      {/* Nhập số lượng */}
      <div className='quantityproduct'>
        <label>Số lượng:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
        />
      </div>

      <button onClick={handleAddProduct} className='addproduct'>Thêm sản phẩm</button>

      {/* Danh sách sản phẩm đã chọn */}
      <div className='listproduct'>
        <h2>Danh sách sản phẩm sẽ thêm:</h2>
        {productsToAdd.length > 0 ? (
          <ul className='listproduct-item'>
            {productsToAdd.map((product, index) => (
              <li key={index} className='list-item'>
              <img src={`${url}/images/`+product.image} className='image-product-store'/>
                {product.name} - Số lượng: {product.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có sản phẩm nào được chọn.</p>
        )}
      </div>

      <button onClick={handleAddToStore} className='add2store'>Thêm tất cả vào nhà kho</button>
    </div>
  );
};

export default AddProductsToStore;
