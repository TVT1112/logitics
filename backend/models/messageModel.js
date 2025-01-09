import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "adminuser", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "adminuser", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const messageModel = mongoose.model.message || mongoose.model("message", messageSchema);
export default messageModel;
