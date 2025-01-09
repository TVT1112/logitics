import messageModel from "../models/messageModel.js";

const getmessage = async (req,res)=>{
    const { userId1, userId2 } = req.params;

  try {
    const messages = await messageModel.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
}

const sendmessage = async (req,res)=>{
    const { sender, receiver, content } = req.body;

  try {
    const message = await messageModel.create({ sender, receiver, content });
    req.io.emit("new-message", message); // Phát sự kiện Socket.IO
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
}

export {getmessage,sendmessage}