const userInfo = require("../model/userInfo");
const Post = require("../model/post");
const bcrypt=require('bcrypt')

const userRegister = (req, res) => {
  let{name,email,password}=req.body
  let {filename}=req.file
  if(!name || !email || !password || !filename){
     res.status(401).json({msg:"all the fields are required"})
  }

  else
  {
    userInfo.findOne({email:email})
    .then((userExit)=>{

      if(userExit){
         res.status(400).json({msg:"email already registered"})
      }

      else
      {
        const hashing=bcrypt.hashSync(password,10)
        userInfo.create({name,email,password:hashing,image:filename})
        .then(()=>res.status(201).json({msg:"succesfully registered"}))
        .catch((e)=>console.log(e))
      }
    })
    .catch((e)=>console.log(e))
  }
};

const LoginUser=(req,res)=>{
  let {email,password}=req.body
  if(!email || !password){
    res.json({msg:"please fill all the fields"})
  }
  else
  {
    userInfo.findOne({email:email})
    .then((userExits)=>{
      if(userExits){
        passwordMatching= bcrypt.compareSync(password,userExits.password)
        if(passwordMatching){
          res.status(200).json(userExits)
        }
        else{
          res.status(400).json({msg:"password not match"})
        }
      }
      else{
        res.status(404).json({msg:"email not registered"})

      }
    })
    .catch((e)=>console.log(e))
  }
}

const userData=(req,res)=>{
  userInfo.find({})
  .then((DataFound)=>{
    if(DataFound){
      res.status(201).json(DataFound)
    }
    else{
      res.json(404).json({msg:"no data found"})
    }
  })

}

const UpdateUser= async(req,res)=>{
  if(req.body.userId===req.params.id)
  {
    if(req.body.password){
      req.body.password= await bcrypt.hash(req.body.password,10)
    }
    try 
    {
      let updating= await userInfo.findByIdAndUpdate(req.body.userId,{$set:req.body},{new:true}) 
      if(updating){
        res.status(201).json(updating)
      }
      else{res.status(400).json({msg:"data not updated"})}
    } 
    catch (error) {
      console.log(error)
    }
  }
  else
  {
    res.status(404).json({msg:"user id not matched you cannot update"})
  }
}

const DeleteUser=async(req,res)=>{
  if(req.body.userId===req.params.id)
  {
    try 
    {
      const user = await userInfo.findById(req.params.id)
      try
      {
        await Post.deleteMany({username:user.name})
        const deleteUser=await userInfo.findByIdAndDelete(req.params.id);
        if(deleteUser)
        {
          res.status(200).json({msg:"user deleted sucessfully"})
        }
        else
        {
          res.status(400).json({msg:"user not  deleted your id didnot match to any account"})
        }
      }
  
      catch(error)
      {
        console.log(error)
      }
    } 
    catch (error) 
    {
      res.status(404).json({msg:'user doesnot exits'})
    }
  }
  else
  {
    res.status(404).json({msg:"your id doesnot match"})
  }
}

const SingleUser=async(req,res)=>{
  try 
  {
    const single =await userInfo.findById({_id:req.params.id})
    if(single)
    {
      const {password , ...others}=single._doc
      res.status(200).json(others)
    }
    else
    {
      req.status(404).json({msg:'user  not exits'})
    }
  } 
  catch (error) 
  {
    res.status(404).json({msg:"user not exits"})
  }  
}
module.exports = { userRegister,LoginUser,userData,UpdateUser,DeleteUser,SingleUser};
