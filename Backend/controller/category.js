const { get } = require('mongoose');
const catModel=require('../model/category');

const addCat=async(req,res)=>{
    const {catname}=req.body
    try 
    {
        const postCategory=await catModel.create({name:catname})
        if(postCategory){res.status(201).json({msg:"category added"})}
        else{res.status(400).json({msg:"failed to add"})
    }
    } 
    catch (error) {
        res.status(500).json({msg:"something wents wrong"})
    }
}

const getCat=async(req,res)=>{
    try 
    {
        const getAll=await catModel.find()
        if(getAll){res.status(201).json(getAll)}
        else{res.status(400).json({msg:"no data found"})
    }
    } 
    catch (error) {
        res.status(500).json({msg:error})
    }
}


module.exports={addCat,getCat}