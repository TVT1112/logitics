import storeModel from "../models/storeModel.js";
import foodModel from '../models/foodModel.js'

const liststore = async (req,res)=>{
    try {
        const store = await storeModel.find()
        res.json({success:true,data:store})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const getstoreByName= async(req,res)=>{
    const {namestore}= req.query;
    try {
        const store= await storeModel.find({ namestore: { $regex: namestore, $options: 'i' }})
        if (!store) {
        return res.status(404).json({ success: false, message: 'Store not found' });
        }
        res.json({ success: true,data:store });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}




const updatelistproduct = async (req, res) => {
    const { namestore, products } = req.body;

    try {
        // Kiểm tra nếu thiếu tham số
        if (!namestore || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ success: false, message: "Vui lòng cung cấp đầy đủ thông tin sản phẩm." });
        }

        // Tìm nhà kho theo tên (không phân biệt chữ hoa, chữ thường)
        const store = await storeModel.findOne({ namestore: { $regex: new RegExp(namestore, "i") } });
        if (!store) {
            return res.status(404).json({ success: false, message: "Nhà kho không tồn tại!" });
        }

        // Cập nhật sản phẩm
        for (const item of products) {
            const { productId, quantity } = item;

            // Kiểm tra thông tin từng sản phẩm
            if (!productId || !quantity || quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Mỗi sản phẩm cần có ID hợp lệ và số lượng lớn hơn 0.",
                });
            }

            // Tìm sản phẩm theo ID
            const product = await foodModel.findById(productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Sản phẩm với ID ${productId} không tồn tại!`,
                });
            }

            // Kiểm tra và cập nhật trong danh sách sản phẩm
            if (store.listproduct[productId]) {
                store.listproduct[productId].quantity += quantity; // Cộng thêm số lượng
            } else {
                store.listproduct[productId] = {
                    product,
                    quantity,
                };
            }
        }

        // Lưu lại thông tin nhà kho
        await store.save();

        return res.status(200).json({
            success: true,
            message: "Các sản phẩm đã được thêm vào kho thành công!",
        });
    } catch (error) {
        console.error("Error adding products to store:", error);
        return res.status(500).json({ success: false, message: "Lỗi hệ thống!" });
    }
};


const removelistproduct = async (req, res) => {
  const { storeName, productId } = req.body;

  try {
    // Tìm nhà kho theo tên
    const store = await storeModel.findOne({ namestore: storeName });
    if (!store) {
      return res.status(404).json({ success: false, message: 'Nhà kho không tồn tại!' });
    }

    // Kiểm tra xem sản phẩm có trong listproduct không
    if (!store.listproduct || !store.listproduct[productId]) {
      return res.status(404).json({ success: false, message: 'Sản phẩm không có trong kho!' });
    }

    // Xóa sản phẩm khỏi listproduct
    delete store.listproduct[productId];

    // Lưu lại thay đổi
    await store.save();
    res.status(200).json({ success: true, message: 'Sản phẩm đã được xóa khỏi kho' });
  } catch (error) {
    console.error('Error removing product from store:', error);
    res.status(500).json({ success: false, message: 'Lỗi hệ thống' });
  }
};

  

const createStore = async (req,res)=>{
    let image_filename= `${req.file.filename}`

    const store= new storeModel({
        namestore:req.body.namestore,
        img:image_filename,
        address:req.body.address,
        quantityproduct:req.body.quantityproduct,
        status:"Đang hoạt động",
        listproduct:{}
    })
    try {
        await store.save()
        res.json({success:true,message:"Đã thêm nhà kho"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const updatestore = async(req,res)=>{
    const {id}= req.query
    let updatedata= {...req.body}

    if(req.file){
        updatedata.img= req.file.filename
    }

    try {
        const updatedStore = await storeModel.findByIdAndUpdate(
            id,
            updatedata
        )
        res.json({ success: true, message: "Đã cập nhật nhà kho", data: updatedStore });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Lỗi khi cập nhật nhà kho" });
    }
}

const deletestore= async(req,res)=>{
    const {id} = req.params 
    try {
        const deletestored=  await storeModel.findByIdAndDelete(id)
        res.json({ success: true, message: "Đã xóa nhà kho", data: deletestored });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Lỗi khi cập nhật nhà kho" });
    }
}



export {liststore,createStore,updatestore,deletestore,updatelistproduct,getstoreByName,removelistproduct}