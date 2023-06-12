const mongooes=require("mongoose")
require("dotenv").config();
const connection =mongooes.connect(process.env.mongoURL);
module.exports={
    connection
}