import connectDB from "@/app/lib/mongodb";
import products from "@/app/Sachema/products";

export async function DELETE(request) {
    try {
        connectDB();
        const {searchParams} =new URL(request.url) 
        const id = await searchParams.get("id");
        if (!id) {
            return new Response(JSON.stringify({success:false,message:"Product Id required"}),{status:400,headers:{"Content-Type": "application/json"}})
        } 
            let del = products.findByIdAndDelete(id);
        
        if(del){
            return new Response(JSON.stringify({success:true,message:"Product Deleted Successfully"}),{status:200,headers:{"Content-Type": "application/json"}})
        }else{
            return new Response(JSON.stringify({success:false,message:"Product not found!"}),{status:404,headers:{"Content-Type": "application/json"}})
        }
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({success:false,message:"Internal Server Error!",e}),{status:500,headers:{"Content-Type": "application/json"}})
    }
}