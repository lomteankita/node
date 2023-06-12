const mongooes=require("mongoose")


const userSchema=mongooes.Schema({
    name : String,
    email :String,
    gender : String,
    password : String,
    age : Number,
    city : String,
  // is_married :boolean

})

const UserModel=mongooes.model("user",userSchema)

module.exports={
  UserModel
}