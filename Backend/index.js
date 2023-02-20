const express= require ('express');
const cors= require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const router =require('./routes/userinfo')
const post_router=require('./routes/post')
const cat_router=require('./routes/category')
const myParser = require("body-parser");
const path = require('path');
const app = express()
//MIDDLEWARES

app.use(express.json())
app.use(cors({origin:'*'}))
dotenv.config()
app.use(myParser.json({limit: '200mb'}));
app.use(myParser.urlencoded({limit: '200mb', extended: true}));

//PORT
const port = process.env.PORT || 8000

//IMAGE MULTER
app.use("/uploads",express.static('./uploads'))
app.use("/postimage",express.static('./postimage'))

//MONGO QUERY
mongoose.set('strictQuery', false);

//
app.use(express.static(path.join(__dirname,'../blog/build')))
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'../blog/build/index.html'))
})


mongoose.connect('mongodb://127.0.0.1:27017/Blog')

.then(()=>console.log('db connected sucees'))
.catch((e)=>console.log(e))

//ROUTES
app.use('/api',router)
app.use('/post',post_router)
app.use('/category',cat_router)

//PORT LISTEN
app.listen(port,()=>console.log(`server is running on port ${port}`))

