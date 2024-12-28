import userModel from '../models/userModel.js'

const addTocart= async (req,res)=>{
    try {
        let userData = await userModel.findOne({_id:req.body.userId})
        let cartData = await userData.cartData
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Đã thêm vô giỏ"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const removeFromcart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Đã xóa khỏi giỏ hàng"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const getCart= async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        if (!userData) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }
        let cartData = await userData.cartData

        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

export {addTocart,removeFromcart,getCart}
