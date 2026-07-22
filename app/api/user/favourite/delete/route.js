import connectDB from "@/app/lib/mongodb";
import User from "@/app/Sachema/User";
export async function DELETE(req) {
    try {
        await connectDB();
        const { email, productId } = await req.json()
        if (!productId || !email) {
            return new Response(JSON.stringify({ success: false, message: "Product or Email Not Found!" }, { status: 404, header: { "Content-Type": "application/json" } }),)
        }
        const Userupdate = await User.findOneAndUpdate({ email: email },
            {$pull:{favourite:{productId:productId}}},
            {new:true}
        );
        if(Userupdate){
            return new Response(JSON.stringify({ success: true, message: "Favourite Removed!" }, { status: 200, header: { "Content-Type": "application/json" } }),)
        }else {
            return new Response(JSON.stringify({ success: false, message: "Product is not Favourite!" }, { status: 404, header: { "Content-Type": "application/json" } }),)
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, message: "Internal Server Error!" }, { status: 500, header: { "Content-Type": "application/json" } }),)
    }
}