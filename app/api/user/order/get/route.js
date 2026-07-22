import Order from "@/app/Sachema/Order";
import connectDB from "@/app/lib/mongodb";

export async function GET(req){
    try {
     await connectDB();    
        const {searchParams} = new URL(req.url)
        const email = searchParams.get("email")
    if(!email){
        return new Response(JSON.stringify({success:false,message:"No Email Found!"}),{status:404,headers:{"Content-Type":"application/json"}})
    }
    const Orderdetail = await Order.find({email});
    if(Orderdetail.length === 0){
        return new Response(JSON.stringify({success:false,message:"No Orders Found!"}),{status:404,headers:{"Content-Type":"application/json"}})
    }
    return new Response(JSON.stringify({success:true,message:"Orders Found!",Orderdetail}),{status:200,headers:{"Content-Type":"application/json"}})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({success:false,message:"Internal Server Error!"}),{status:500,headers:{"Content-Type":"application/json"}})
    }
}