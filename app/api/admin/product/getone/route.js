import connectDB from "@/app/lib/mongodb";
import Product from "@/app/Sachema/products";

export async function GET(request) {
    try {
        await connectDB();    
        const {searchParams} = new URL(request.url)
        const Id = searchParams.get("Id")
        if (!Id) {
            console.log(Id)
            console.log("No Id")
            return new Response(JSON.stringify({success:false,message:"Product Id required"}),{status:403,headers:{"Content-Type": "application/json"}})
        } 
            const product = await Product.findOne({_id:Id});
        if(product){
            return new Response(JSON.stringify({success: true , product }), { status: 200 , headers: { "Content-Type": "application/json" } });
        }else{
            return new Response(JSON.stringify({success:false,message:"Product not found!"},product),{status:404,headers:{"Content-Type": "application/json"}})
        }
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({success:false,message:"Internal Server Error!",e}),{status:500,headers:{"Content-Type": "application/json"}})
    }
}