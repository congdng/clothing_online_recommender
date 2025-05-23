import express from "express";
import multer from "multer";
import path from 'path';
const router = express.Router()
function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png|webp/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (extname){
        return cb(null, true)
    }else{
        cb('Input only iamge format')
    }
}
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb (null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})
router.post('/', upload.single('image'), (req, res)=>{
    res.send(`'${req.file.path}`)
})

export default router