import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/mongodb';
import Admin from '@/app/Sachema/admin';


export async function POST(request) {
     await connectDB();
    const { adminname, password } = await request.json()
    const admin = await Admin.findOne({ adminname })
    if (!adminname) {
        return new Response(JSON.stringify({ success: false, message: "Admin Name Requierd!" }), { status: 400, headers: { "Content-Type": "application/json" } })
    }
    if(!admin){
       return new Response(JSON.stringify({ success: false, message: "Admin Name not Found!" }), { status: 404, headers: { "Content-Type": "application/json" } }) 
    }
    const ValidPassword = await bcrypt.compare(password, admin.password)
    if (!ValidPassword) {
        return new Response(JSON.stringify({ success: false, message: "Wrong Password!" }), { status: 401, headers: { "Content-Type": "application/json" } })
    } else {
        const token = jwt.sign(
            { id: admin._id, adminname: admin.adminname },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return new Response(JSON.stringify({success : true , message: "Login Successful" }), {
            status: 200,
            headers: {
                'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`,
                "Content-Type": "application/json"
            },
        });
    }


}