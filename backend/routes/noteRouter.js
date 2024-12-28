import express from 'express'
import { addnote, deletenote, listnote, updateNote } from '../controllers/noteController.js'
const noteRouter= express.Router()

noteRouter.get("/get",listnote)
noteRouter.post("/add",addnote)
noteRouter.put("/update",updateNote)
noteRouter.delete("/delete",deletenote)

export default noteRouter