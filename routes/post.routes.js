const express=require("express")
const {PostModel}=require("../models/postModel.model")
const { auth } = require("../middleware/auth.middleware")
const postRoute=express()

postRoute.use(auth)


postRoute.post("/add",async(req,res)=>{
    try {
        const post=new PostModel(req.body)
        await post.save()
        console.log(post)
        res.status(200).json({msg:"post added successfully",post})
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:error})
    }
})

postRoute.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const data=await PostModel.findOne({_id:id})
        if(data.userID===req.body.userID){
            const post=await PostModel.findByIdAndDelete({_id:id})
            res.status(200).json({msg:"post deleted successfully",post})
        }
        else{
            res.status(200).json({msg:"you don't have access"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({msg:error})
    }
})


module.exports={
    postRoute
}
