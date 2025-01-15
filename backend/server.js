import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import foodRouter from "./routes/foodRouter.js"
import userRouter from "./routes/userRouter.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"
import noteRouter from "./routes/noteRouter.js"
import targetRouter from "./routes/targetRouter.js"
import adminuserRouter from "./routes/adminuserRouter.js"
import storeRoute from "./routes/storeRouter.js"
import {Server} from 'socket.io'
import http from 'http'
import shipRouter from "./routes/shipRouter.js"
import messRouter from "./routes/messageRouter.js"
import taskRouter from "./routes/taskRouter.js"
import chatbotRouter from "./routes/chatbotRouter.js"


const PORT=4000

const app = express()
app.use(express.json())
app.use(cors())

const server = http.createServer(app);



// Tạo Socket.IO server
const io = new Server(server, {
    cors: {
        origin: "*", // Cho phép tất cả các origin (hoặc thay bằng URL cụ thể của frontend)
        methods: ["GET", "POST"], // Các phương thức HTTP được phép
    },
});



io.on("connection", (socket) => {
    console.log(`🔗 Client connected: ${socket.id}`);  

    // Lắng nghe sự kiện `disconnect`
    socket.on("disconnect", () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
    });
});

mongoose
    .connect("mongodb://127.0.0.1:27017/food_delivery")
    .then(()=> console.log('Mongo connected'))
    .catch((err) => console.log(err));

app.use((req, res, next) => {
    req.io = io; // Gắn io vào req để sử dụng trong controller
    next();
});
// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/note",noteRouter)
app.use("/api/target",targetRouter)
app.use("/api/adminuser",adminuserRouter)
app.use("/api/store",storeRoute)
app.use("/api/ship",shipRouter)
app.use("/api/mess",messRouter)
app.use("/api/task",taskRouter)
app.use("/api/chatbot",chatbotRouter)

app.get("/",(req,res)=>{
    res.send("api hoạt động")
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});