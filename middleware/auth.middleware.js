const jwt=require("jsonwebtoken")
const { BlacklistModel } = require("../models/Blacklist.model")

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try {
        if(token){
            let existToken=await BlacklistModel.find({
                blacklist: { $in:token},
            })
            if(existToken.length > 0){
                res.status(200).json({msg:"login again"})
            }
            const decoded=jwt.verify(token,"eval_practice")
            if(decoded){
                req.body.userID=decoded.userID
                req.body.user=decoded.user
                console.log(decoded.userID,decoded.user)
                next()
            }
            else{
                res.status(200).json({msg:"subscription expired"})
            }
        }
        else{
            res.status(200).json({msg:"access denied"})
        }
    } catch (error) {
        res.status(400).json({msg:error})
    }
}


module.exports={
    auth
}