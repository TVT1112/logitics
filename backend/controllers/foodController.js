import foodModel from "../models/foodModel.js";
import fs from 'fs'

//thêm sản phẩm

const addFood = async (req,res)=>{
    
    let image_filename=`${req.file.filename}`

     const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
     })

     try {
        await food.save();
        res.json({success:true,message:"Đã thêm sản phẩm"})
     } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
     }
}

// danh sách đồ ăn
const listFood= async (req,res)=>{
    try {
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(err)
        res.json({success:false,message:"lỗi"})
    }
}

const listFoodbyname= async (req,res)=>{
    try {
        const {name}= req.query
        const foods=await foodModel.find({ name: { $regex: name, $options: 'i' }})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(err)
        res.json({success:false,message:"lỗi"})
    }
}


//xóa đồ ăn
const removeFood= async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Đã loại bỏ sản phẩm"})
    } catch (error) {
        console.log(err)
        res.json({success:false,message:"Lỗi"})
        
    }
}

export {addFood,listFood,removeFood,listFoodbyname} 

