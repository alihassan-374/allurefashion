import connectDB from "@/app/lib/mongodb";
import products from "@/app/Sachema/products";
export async function GET() {
    try{
  await connectDB();
    const product = await products.find({});
    if (!products){
      return new Response(JSON.stringify({success:false,product,message:"No Product found"}),{status:404, headers: { "Content-Type": "application/json" } });
    }else if(products=={} || products.length===0){
      return new Response(JSON.stringify({success:false,product,message:"No Product found"}),{status:404, headers: { "Content-Type": "application/json" } });
    }else{
      return new Response(JSON.stringify({success: true , product , message:"Products found"}), { status: 200 , headers: { "Content-Type": "application/json" } });
    }
    } catch (error) {
    return new Response(JSON.stringify({message: "Error happened while fetching products" }), { status: 500 , headers: { "Content-Type": "application/json" } });
  }
}