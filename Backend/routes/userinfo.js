const express = require ('express');
const multer  = require ('multer');
const {userRegister,LoginUser,userData,UpdateUser,DeleteUser,SingleUser}=require('../controller/userinfo');

const router=express.Router();

const imgconfig=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`);
    }
})

const isImage=(req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }
    else{
        callback(new Error('only image is allowed'))
    }
}

const upload=multer({
    storage:imgconfig,
    fileFilter:isImage
})
router.post('/register',upload.single("photo"),userRegister)
router.post('/login',LoginUser)
router.get('/userdata',userData)
router.put('/:id',UpdateUser)
// upload.single("photo"),
router.delete('/:id',DeleteUser)
router.get('/:id',SingleUser)
module.exports=router



