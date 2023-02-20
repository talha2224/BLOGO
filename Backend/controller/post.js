
const Post=require('../model/post')
const postModel=require ('../model/post')

const createPost=async(req,res)=>{
    try 
    {
        let {title,desc,username,categories}=req.body
        let {filename}=req.file
        const newPost= await postModel.create({username:username,title:title,description:desc,categories:categories,photo:filename})
        if(newPost)
        {
            res.status(201).json(newPost)
        }
        else
        {
            res.status(400).json({msg:"something wents wrongs please try again"})
        }
    } 
    catch (error) 
    {
        res.status(400).json({msg:"something wents wrongs please try again"})
        console.log(error)
    }
}

const getPost=async(req,res)=>{
    const username=req.query.name;
    const category=req.query.category
    console.log(username,category)
    try 
    {
        let post;
        if(username){post=await postModel.find({username})}
        else if(category){post = await postModel.find({categories:{$in:[category]}})}
        else{
            const allPost=await postModel.find({})
            if(allPost){res.status(201).json(allPost)}
        } 
        res.status(200).json(post)
    } 
    catch (error) {
       res.json(error) 
    }
}

const singlePost=async(req,res)=>{
    if(req.params.id)
    {
        try 
        {
            const singlePost=await postModel.findById({_id:req.params.id})
            if(singlePost)
            {
                res.status(201).json(singlePost)
            }
            else
            {
                res.status(400).json({msg:"something error"})
            }
        } 
        catch (error) 
        {
            res.status(400).json({msg:"something error"})
        }
    }
    else
    {
        res.status(404).json({msg:"no post found"})
    }

}

const updatePost=async(req,res)=>{
    try 
    {
      const post = await postModel.findById(req.params.id)
      if(post.username===req.body.username)
      {
        try 
        {
            const updated=await postModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            if(updated)
            {
                res.status(200).json(updated)
            }
            else
            {
                res.status(400).json({msg:"post not updated error"})

            }
        } 
        catch (error) 
        {
            res.status(500).json(error)
        }
      }

      else
      {
        res.status(500).json({msg:"it is not your post you cannot update"})
      }
    } 
    catch (error) 
    {
        res.status(500).json(error)
    }
}

const deletePost=async (req,res)=>{
    try 
    {
        const postDetail=await postModel.findById(req.params.id)
        if(postDetail.username===req.body.username)
        {
            try 
            {
                const delPost=await postModel.findByIdAndDelete(req.params.id)
                if(delPost)
                {
                    res.status(200).json({msg:"post has been deleted"})
                }
                else
                {
                    res.status(404).json({msg:"post has not been deleted"})

                }
            } 
            catch (error) 
            {
                res.status(400).json("Something Wents Wrong")

            }
        }
    } catch (error) 
    {
        res.status(500).json("your is didnot correspond to any post")
    }
}

module.exports={createPost,getPost,singlePost,updatePost,deletePost}