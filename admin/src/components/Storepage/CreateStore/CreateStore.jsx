import React, { useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import './CreateStore.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateStore = ({ url }) => {
  const [img, setImage] = useState(null);
  const [formData, setFormData] = useState({
    namestore: '',
    address: { duong: '', phuong: '', city: '' },
    quantityproduct: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('namestore', formData.namestore);
    formDataToSend.append('img', img);
    formDataToSend.append('address', JSON.stringify(formData.address));
    formDataToSend.append('quantityproduct', formData.quantityproduct);

    try {
      const response = await axios.post(`${url}/api/store/create`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.success) {
        toast.success("nhà kho đã được thêm")
        // Reset form
        setFormData({
          namestore: '',
          address: { duong: '', phuong: '', city: '' },
          quantityproduct: 0,
        });
        setImage(null);
      }
    } catch (error) {
      console.error('Lỗi khi thêm nhà kho:', error);
      alert('Thêm nhà kho thất bại.');
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (['duong', 'phuong', 'city'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="form-container">
      <h2>Thêm nhà kho</h2>
      <form className="flex-col" onSubmit={handleSubmit}>
        {/* Tải hình ảnh */}
        <div className="add-img-upload flex-col">
          <p>Tải hình ảnh</p>
          <label htmlFor="img">
            {img ? (
              <img src={URL.createObjectURL(img)} alt="Preview" />
            ) : (
              <BiUpload className="form-icon" />
            )}
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="img"
            hidden
            required
          />
        </div>

        {/* Tên nhà kho */}
        <div className="add-store-name flex-col">
          <p>Tên nhà kho</p>
          <input
            name="namestore"
            onChange={onChangeHandler}
            value={formData.namestore}
            type="text"
            placeholder="Nhập tên nhà kho"
            required
          />
        </div>

        {/* Địa chỉ */}
        <p>Địa chỉ</p>
        <input
          required
          type="text"
          name="duong"
          onChange={onChangeHandler}
          value={formData.address.duong}
          placeholder="Đường"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            name="phuong"
            onChange={onChangeHandler}
            value={formData.address.phuong}
            placeholder="Phường hoặc phố"
          />
          <input
            required
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={formData.address.city}
            placeholder="Thành phố"
          />
        </div>

        {/* Nút xác nhận */}
        <button type="submit" className="add-btn">
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
