import mongoose  from "mongoose";

const adminuserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    type:{type:String,default:"Admin"},

},{minimize:false})

const adminuserModel= mongoose.model.user || mongoose.model("adminuser",adminuserSchema)

export default adminuserModel