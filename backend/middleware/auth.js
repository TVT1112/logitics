import jwt from 'jsonwebtoken'

const authMiddware = async (req,res,next)=>{
    const {token}=req.headers
    if(!token){
        return res.json({success:false,message:"Không được đăng nhập"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId= token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Lỗi"})
    }
}

export default authMiddware