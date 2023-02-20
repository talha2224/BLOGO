const mongoose=require('mongoose')
const schema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String
})

const userInfo=mongoose.model('userinfo',schema)
module.exports=userInfo