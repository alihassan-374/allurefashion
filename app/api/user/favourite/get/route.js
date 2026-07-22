import User from "@/app/Sachema/User";
import connectDB from "@/app/lib/mongodb";

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url)
        const email = searchParams.get("email")
        if (!email) {
            return new Response(JSON.stringify({ success: false, message: "Email is required!" }, { status: 400, header: { "Content-Type": "application/json" } }),)
        }
        const Userdetail = await User.findOne({ email: email }).select('favourite');
        console.log(Userdetail)
        if (!Userdetail) {
            return new Response(JSON.stringify({ success: false, message: "User Not Found!" }, { status: 404, header: { "Content-Type": "application/json" } }),)
        }
        console.log(Userdetail.favourite)
        return new Response(JSON.stringify({ success: true, favourite: Userdetail.favourite, message: "Favourites Found!" }, { status: 200, header: { "Content-Type": "application/json" } }))

    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ success: false, message: "Internal Server Error!" }, { status: 500, header: { "Content-Type": "application/json" } }),)
    }
}