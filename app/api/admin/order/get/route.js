import connectDB from "@/app/lib/mongodb";
import Order from "@/app/Sachema/Order";
export async function GET() {
    try{
  await connectDB();
    const orders = await Order.find({});
    if (!orders){
      return new Response(JSON.stringify({success:false,products,message:"No Orders found"}),{status:404, headers: { "Content-Type": "application/json" } });
    }else if(products=={} || products.length===0){
      return new Response(JSON.stringify({success:false,products,message:"No Orders found"}),{status:404, headers: { "Content-Type": "application/json" } });
    }else{
      return new Response(JSON.stringify({success: true , orders , message:"Orders found"}), { status: 200 , headers: { "Content-Type": "application/json" } });
    }
    } catch (error) {
    return new Response(JSON.stringify({message: "Error happened while fetching products" }), { status: 500 , headers: { "Content-Type": "application/json" } });
  }
}