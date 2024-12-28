import mongoose, { mongo }  from "mongoose";

const targetSchema= new mongoose.Schema({
    name:{type:String,required:true},
    description:{
        type:String
    },
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    status:{type:String,default:"chưa bắt đầu"}
})

const targetModel= mongoose.models.target || mongoose.model("target",targetSchema)

export default targetModel
