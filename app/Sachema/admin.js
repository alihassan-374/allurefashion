import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminname : {type:String,required:true},
    password : {type:String,required:true},
})

export default mongoose.models.Admin ||  mongoose.model("Admin" , adminSchema) 