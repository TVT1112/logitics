import mongoose from "mongoose";

const shipSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  shipper: { 
    name: { type: String, required: true }, // Tên người giao hàng
    phone: { type: String, required: true }, // Số điện thoại người giao hàng
    email: { type: String, required: true }, // Email người giao hàng
  },
  vehicle: {
    type: { type: String, required: true }, // Loại phương tiện (ví dụ: xe máy, ô tô)
    licensePlate: { type: String, required: true }, // Biển số phương tiện
  },
  status: { type: String, default: 'Chưa vận chuyển' },
  shipmentDate: { type: Date, default: Date.now },
})

const shipModel= mongoose.model.ship || mongoose.model("ship",shipSchema)
export default shipModel