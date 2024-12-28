import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

///login 
const loginUser = async (req,res)=>{
    const {email,password}= req.body
    try {
        const user= await userModel.findOne({email})

         if(!user){
            return res.json({success:false,message:"Tài khoản không tồn tại"})

        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Không đúng"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"lỗi"})
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// dang ki
const registerUser = async (req,res)=>{
    const {name,password,email}=req.body
    try {
        const exitst = await userModel.findOne({email})
        if(exitst){
            return res.json({success:false, messge:"Tài khoản đã tồn tại"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, messge:"Nhập email hợp lệ"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const newUser= new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token= createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

export {loginUser,registerUser}