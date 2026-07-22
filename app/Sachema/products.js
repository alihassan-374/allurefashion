import mongoose from "mongoose";

const productSachema = new mongoose.Schema({
    title : {type:String,required:true},
    price : {type:Number,required:true},
    mainimg : {type:String,required:true},
    secondimg : {type:String , required:true},
    thirdimg : {type:String, required:true},
    desc : {type:String,required:true},
    catogery : {type:String,required:true}
})

export default mongoose.models.Product ||  mongoose.model("Product" , productSachema) 