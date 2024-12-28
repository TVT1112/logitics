import targetModel from "../models/targetModel.js"

const listtarget = async (req,res)=>{
    try {
        const notes = await targetModel.find()
        res.json({success:true,data:notes})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const addtarget = async (req,res)=>{
    const {name,description,startDate,endDate,status}= req.body
    const target = new targetModel({name,description,startDate,endDate,status})
    await target.save()
    res.json({success:true,message:"đã thêm mục tiêu",data:target})
}

const updatetarget= async (req,res)=>{
    const {id}=req.body
    try {
        const target =await targetModel.findById(id)
        target.status= req.body.status || target.status
        await target.save()
        res.json({success:true,data:target})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const deletetarget = async (req,res)=>{
    const {id}= req.query
    try {
        await targetModel.findByIdAndDelete(id)
        res.json({success:true,message:"đã xóa thành công"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})  
    }
    
}

export {listtarget,addtarget,updatetarget,deletetarget}