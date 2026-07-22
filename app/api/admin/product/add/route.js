import connectDB from "@/app/lib/mongodb";
import products from "@/app/Sachema/products";

export async function POST(request) {
    try {
        connectDB();
        const {title,price,mainimg,secondimg,thirdimg,desc,catogery} = await request.json();
        const NewProduct = await products.create({
            title,
            price,
            mainimg,
            secondimg,
            thirdimg,
            desc,
            catogery
        })
        if(NewProduct){
            return new Response(JSON.stringify({success:true,message:"Product Added Successfully"}),{status:201,headers:{"Content-Type": "application/json"}})
        }else{
            console.log("else")
            return new Response(JSON.stringify({success:false,message:"Product Addition failed"}),{status:500,headers:{"Content-Type": "application/json"}})
        }
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({success:true,message:"Internal Server Error!",e}),{status:500,headers:{"Content-Type": "application/json"}})
    }
}