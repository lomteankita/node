const express =require("express");
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const { postRoute } = require("./routes/postRoute.route")
const cors = require('cors')

const app =express();

app.use(cors())
app.use(express.json());
app.use(express.json());


app.use("/users",userRouter)
app.use("/posts",userRouter)





app.listen(4500,async()=>{

    try{
        await connection
        console.log("connected")
        console.log("server is runing")

    }catch(err){
        console.log(err);
        console.log("somthing wrong")

    }




   
})