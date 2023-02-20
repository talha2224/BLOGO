const router = require('express').Router();
const {createPost,getPost,singlePost,updatePost,deletePost}=require('../controller/post')
const multer = require ('multer')

const imgconfig=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./postimage')
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

router.post('/',upload.single('photo'),createPost)
router.get('/',getPost);
router.put('/:id',upload.single('photo'),updatePost);
router.delete('/:id',deletePost);
router.get('/:id',singlePost)

module.exports=router