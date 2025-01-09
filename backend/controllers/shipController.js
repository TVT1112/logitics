import shipModel from "../models/ship.js";
import orderModel from "../models/orderModel.js";

const listship = async (req,res)=>{
    try {
        const list = await shipModel.find()
        res.json({success:true,data:list})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}
const createship = async (req,res)=>{
    const { orderId, shipper, vehicle } = req.body;
    try {
        const order = await orderModel.findById(orderId)
        if (!order) return res.status(404).send({ error: 'Order not found' });

        const shipment = new shipModel({
            orderId:order._id,
            userId:order.UserId,
            items: order.items,
            amount : order.amount,
            shipper: {
                name: shipper.name, // Tên shipper
                phone: shipper.phone, // Số điện thoại shipper
                email: shipper.email, // Email shipper
            },
            vehicle: {
                type: vehicle.type, // Loại phương tiện (ví dụ: xe máy, ô tô)
                licensePlate: vehicle.licensePlate, // Biển số phương tiện
            },
            address:order.address,
        })

        await shipment.save()
        res.json({success:true,message:"Đã đặt hàng thành công"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const updateStatus = async (req,res)=>{
    const { shipId, status } = req.body;

  try {
    const shipment = await shipModel.findById(shipId);
    if (!shipment) {
      return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại" });
    }

    shipment.status = status; // Cập nhật trạng thái
    await shipment.save(); // Lưu lại thông tin

    res.status(200).json({ success: true, message: "Trạng thái đơn hàng đã được cập nhật thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi cập nhật trạng thái" });
  }
}

const deleteShipment = async (req, res) => {
    const { shipId } = req.query;
  
    try {
      // Kiểm tra xem đơn hàng có tồn tại không
      const shipment = await shipModel.findById(shipId);
      if (!shipment) {
        return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại" });
      }
  
      // Xóa đơn hàng
      await shipModel.findByIdAndDelete(shipId);
  
      res.status(200).json({ success: true, message: "Đơn hàng đã được xóa" });
    } catch (error) {
      console.error(error); // In lỗi để debug
      res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi xóa đơn hàng" });
    }
  };
  


export {createship,listship,updateStatus,deleteShipment}