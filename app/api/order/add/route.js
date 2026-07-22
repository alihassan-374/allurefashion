import connectDB from "@/app/lib/mongodb";
import Order from "@/app/Sachema/Order";
import products from "@/app/Sachema/products";
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { productId, quantity, name, phone, address, email, transactionId } = body;

    if (!productId || !quantity || !name || !phone || !transactionId) {
      return Response.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // Fetch product
    const productdetail = await products.findById(productId);
    if (!productdetail) {
      return Response.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }


    const product= 
      {
        productId,
        title: productdetail.title,
        price: productdetail.price,
        quantity,
        mainimg: productdetail.mainimg,
      };

    const 
    Totalamount = productdetail.price * quantity;

    const finalorder = await Order.create({
      email,
      name,
      phone,
      address,
      product,
      Totalamount,
      transactionId
    });
const transporter = nodemailer.createTransport({
      service: "gmail", // automatically uses smtp.gmail.com with TLS
      auth: {
        user: process.env.SMTP_USER,  // not EMAIL_USER
        pass: process.env.SMTP_PASS,
      },
    });


    // Mail content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: ["Bauna <salmanmaniawan769@gmail.com> ", "Ali <ali2222222hassan@gmail.com>"],
      subject: 'Order Done!',
      text: `Order has been done. Detail is as follow:${finalorder}`,
      html: `<p>Order has been done. Detail is as follow:${finalorder}</p>`,
    };

    
    await transporter.sendMail(mailOptions);

    return Response.json(
      { success: true,  },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
