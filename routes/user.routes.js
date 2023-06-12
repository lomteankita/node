const express =require("express")
const {UserModel}=require("../models/user.model")
const bcrypt =require("bcrypt")
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
const { BlacklistModel } = require("../models/Blacklist.model");
const { auth } = require("../middleware/auth.middleware")




// userRouter.post("/register",async(req,res)=>{
// const { name, email ,gender ,password ,age ,city ,is_married}=req.body
// try{
//     bcrypt.hash(pass,5,async(err,hash)=>{
//         if(err){
//             res.json({error:err.message})
//         }else{
//             const user=new UserModel({name, email ,gender ,password:hash,age ,city ,is_married})
//             await user.save()
//         }
//     })

// }catch(err){
//     res.json({error:err.message})

// }
// })




userRouter.post("/register",async(req,res)=>{
    const { name, email ,gender ,password ,age ,city ,is_married}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            res.status(200).json({msg:"user already exist, please Login!! "})
        }
        else{
            bcrypt.hash(pass, 6, async(err, hash)=> {
                if(hash){
                    const data=new UserModel({name, email ,gender ,password :hash,age ,city ,is_married})
                    await data.save()
                    res.status(200).json({msg:"user registered successfully!!",data})
                }
                else{
                    res.status(200).json({msg:"password not hash",err})
                }
            });
        }
    } catch (error) {
        res.status(400).json({msg:error})
    }
})




userRouter.post("/login",async(req,res)=>{

    const { name, email ,gender ,password ,age ,city ,is_married}=req.body
    try{
        const user =await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password.user.password,(err,result)=>{
                    if(result){
                        let token=jwt.sign({userId:user._id,user:user.name},"masai")
                        res.json({msg:"Logged In",token})
                    }else{
                        res.json({error:err.message})
                    }

            })

        }else{
            res.json({msg:"user does not exist"})

        }
    }catch(err){
        res.json({error:err.message})

    }
    
})

// userRouter.post("/logout",(req,res)=>{

    
// })


userRouter.get("/logout",async(req,res)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1]
        if(token){
            await BlacklistModel.updateMany({}, { $push: {blacklist:[token]}})
            res.status(200).json({msg:"Logout successfully!!"})
        }
    } catch (error) {
        res.status(400).json({msg:error})
    }
})