import mongoose, { mongo }  from "mongoose";

const noteSchema= new mongoose.Schema({
    text:{
        type:String
    },
    checkbox:{type:Boolean,default:false}
})

const noteModel= mongoose.models.note || mongoose.model("notes",noteSchema)

export default noteModel
