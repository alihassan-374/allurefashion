import connectDB from "@/app/lib/mongodb"
import User from "@/app/Sachema/User"
import products from "@/app/Sachema/products";

export async function POST(req) {
    try {
        await connectDB();
        const { email, productId } = await req.json();
        if (!email) {
            return new Response(JSON.stringify({ success: false, message: "Email Not Found!" }), { status: 404, headers: { "Content-Type": "application/json" } })
        }
        if (!productId) {
            return new Response(JSON.stringify({ success: false, message: "Prodcut Not Found!" }), { status: 404, headers: { "Content-Type": "application/json" } })
        }
        const Userdata = await User.findOne({ email: email });
        const productdata = await products.findById(productId)
        console.log(productdata)
        if (!Userdata) {
            return new Response(JSON.stringify({ success: false, message: "User Not Found!" }), { status: 404, headers: { "Content-Type": "application/json" } })
        }
        if(!productdata){
            return new Response(JSON.stringify({ success: false, message: "Product Not Found!" }), { status: 404, headers: { "Content-Type": "application/json" } })
        }
        if (Userdata.favourite.find(item => item.productId == productId)) {
            console.log(Userdata.favourite.find(item => item.productId === productId))
            return new Response(JSON.stringify({ success: false, message: "Already Exixts in Favourites!" }), { status: 400, headers: { "Content-Type": "application/json" } })
        }
        const finalproduct = {
            productId: productdata._id,
            title: productdata.title,
            price: productdata.price,
            mainimg: productdata.mainimg,
        }
        console.log(finalproduct)
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $push: { favourite: finalproduct } },
            { new: true }
        )
        return new Response(
            JSON.stringify({ success: true, message: "Thank You For Admiring Our Product!" }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error!Contact alluremensfashion@gmail.com if you are facing often errors." }),
            { status: 500 }
        );
    }

}