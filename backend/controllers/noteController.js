import noteModel from "../models/Note.js";

const listnote = async (req,res)=>{
    try {
        const notes = await noteModel.find()
        res.json({success:true,data:notes})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const addnote = async (req,res)=>{
    const {text}= req.body
    const note = new noteModel({text,checkbox:false})
    await note.save()
    res.json({success:true,message:"đã thêm note",data:note})
}

const updateNote= async (req,res)=>{
    const {completed,id}=req.body
    try {
        const note =await noteModel.findByIdAndUpdate(id,{checkbox:completed})
        res.json({success:true,data:note})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

const deletenote = async (req,res)=>{
    
    try {
        await noteModel.findByIdAndDelete(req.query.id)
        res.json({success:true,message:"đã xóa thành công"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})  
    }
    
}

export {listnote,addnote,updateNote,deletenote}