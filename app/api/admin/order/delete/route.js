import connectDB from "@/app/lib/mongodb";
import Order from "@/app/Sachema/Order";

export async function DELETE(request) {
    try {
        connectDB();
        const {searchParams} =new URL(request.url) 
        const id = await searchParams.get("id");
        if (!id) {
            return new Response(JSON.stringify({success:false,message:"Order Id required"}),{status:400,headers:{"Content-Type": "application/json"}})
        } else {
            const del = Order.findByIdAndDelete(id);
        }
        if(del){
            return new Response(JSON.stringify({success:false,message:"Order Deleted Successfully"}),{status:200,headers:{"Content-Type": "application/json"}})
        }else{
            return new Response(JSON.stringify({success:false,message:"Order not found!"}),{status:404,headers:{"Content-Type": "application/json"}})
        }
    } catch (e) {
        return new Response(JSON.stringify({success:true,message:"Internal Server Error!",error:e}),{status:500,headers:{"Content-Type": "application/json"}})
    }
}