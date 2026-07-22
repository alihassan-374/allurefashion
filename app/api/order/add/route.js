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
