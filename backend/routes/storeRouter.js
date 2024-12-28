import express from 'express'
import { createStore, deletestore, getstoreByName, hash, liststore, prevhash, removelistproduct, updatelistproduct, updatestore } from '../controllers/storeController.js'
import multer from 'multer'

const storeRoute = express.Router()
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

storeRoute.get('/liststore',liststore)
storeRoute.get('/getstorebyname',getstoreByName)
storeRoute.post('/create',upload.single('img'),createStore)
storeRoute.put('/update',updatestore)
storeRoute.put('/updatestoredetail',updatelistproduct)
storeRoute.post('/removelistproduct',removelistproduct)
storeRoute.put('/hash',hash)
storeRoute.put('/prevhash',prevhash)
storeRoute.delete('/delete',deletestore)

export default storeRoute