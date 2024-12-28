import mongoose  from "mongoose";

const storeSchema = new mongoose.Schema({
    namestore:{
        type:String,required:true
    },   
    img:{
        type:String, required:true
    },
    address:{
        type:Object,required:true
    },
    quantityproduct:{
        type:Number,default:0
    },
    status:{
        type:String, default:"Đang hoạt động", required:true
    },
    listproduct:{
        type:Object,default:{}
    }
})

const storeModel= mongoose.models.store || mongoose.model("store",storeSchema)

export default storeModel