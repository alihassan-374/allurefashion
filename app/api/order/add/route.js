import connectDB from "@/app/lib/mongodb";
import Order from "@/app/Sachema/Order";
import products from "@/app/Sachema/products";
import nodemailer from 'nodemailer';
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


    const product =
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
          service: "gmail", 
          auth: {
            user: process.env.SMTP_USER,  
            pass: process.env.SMTP_PASS,
          },
        });


    // Mail content
    const mailOptions = {
  from: process.env.SMTP_USER,
  to: [
    "Ali <ali374hassan@gmail.com>",
    "Salman <salmanmaniawan769@gmail.com>"
  ],
  subject: `🛒 New Order #${finalorder._id}`,

  text: `
New Order Received

Customer Details
----------------
Name: ${name}
Email: ${email}
Phone: ${phone}

Product
-------
Title: ${product.title}
Quantity: ${quantity}
Price: Rs. ${product.price}
Total Amount: Rs. ${Totalamount}

Shipping Address
----------------
Village/City: ${address.village}
Tehsil: ${address.tehsil}
District: ${address.district}
Division: ${address.division}
Province: ${address.province}

Transaction ID: ${transactionId}

Order ID: ${finalorder._id}
Order Time: ${new Date(finalorder.createdAt).toLocaleString()}
`,

  html: `
<div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:20px">
  <div style="max-width:650px;margin:auto;background:#fff;border-radius:10px;padding:25px">

    <h2 style="color:#1b1b1b;margin-bottom:10px;">
      🛒 New Order Received
    </h2>

    <p>A new order has been placed on <b>Allure Mens Fashion</b>.</p>

    <hr>

    <h3>Customer Information</h3>
    <table style="width:100%;border-collapse:collapse">
      <tr><td><b>Name</b></td><td>${name}</td></tr>
      <tr><td><b>Email</b></td><td>${email}</td></tr>
      <tr><td><b>Phone</b></td><td>${phone}</td></tr>
    </table>

    <hr>

    <h3>Product Information</h3>
    <table style="width:100%;border-collapse:collapse">
      <tr><td><b>Product</b></td><td>${product.title}</td></tr>
      <tr><td><b>Quantity</b></td><td>${quantity}</td></tr>
      <tr><td><b>Unit Price</b></td><td>Rs. ${product.price}</td></tr>
      <tr>
        <td><b>Total Amount</b></td>
        <td><b>Rs. ${Totalamount}</b></td>
      </tr>
    </table>

    <hr>

    <h3>Shipping Address</h3>

    <p>
      ${address.village}<br>
      ${address.tehsil}<br>
      ${address.district}<br>
      ${address.division}<br>
      ${address.province}
    </p>

    <hr>

    <p><b>Transaction ID:</b> ${transactionId}</p>
    <p><b>Order ID:</b> ${finalorder._id}</p>
    <p><b>Order Date:</b> ${new Date(finalorder.createdAt).toLocaleString()}</p>

    <br>

    <div style="background:#111;color:#fff;padding:12px;text-align:center;border-radius:5px">
      Allure Mens Fashion
    </div>

  </div>
</div>
`,
};

const customerMailOptions = {
  from: `Allure Mens Fashion <${process.env.SMTP_USER}>`,
  to: email,
  subject: `Your Order Has Been Received | Allure Mens Fashion`,

  text: `
Dear ${name},

Thank you for shopping with Allure Mens Fashion!

We have successfully received your order and it is now under review.

Order Details
-------------
Product: ${product.title}
Quantity: ${quantity}
Price: Rs. ${product.price}
Total Amount: Rs. ${Totalamount}

Shipping Address
----------------
${address.village}
${address.tehsil}
${address.district}
${address.division}
${address.province}

Transaction ID: ${transactionId}

Our team will verify your payment and process your order shortly.

If you have any questions, simply reply to this email or contact us.

Thank you for choosing Allure Mens Fashion.

Regards,
Allure Mens Fashion
alluremensfashion@gmail.com
`,
  html: `
<div style="background:#f8f6f2;padding:30px;font-family:Arial,sans-serif;">
  <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,.08);">

    <div style="background:#111;color:#fff;padding:25px;text-align:center;">
      <h1 style="margin:0;">Allure Mens Fashion</h1>
      <p style="margin:8px 0 0;">The Art of Attraction</p>
    </div>

    <div style="padding:30px;color:#333;">

      <h2>Thank You, ${name}! 🎉</h2>

      <p>
        We have successfully received your order.
        Our team will verify your payment and begin processing it as soon as possible.
      </p>

      <h3 style="margin-top:30px;">Order Summary</h3>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px;"><strong>Product</strong></td>
          <td>${product.title}</td>
        </tr>
        <tr>
          <td style="padding:8px;"><strong>Quantity</strong></td>
          <td>${quantity}</td>
        </tr>
        <tr>
          <td style="padding:8px;"><strong>Price</strong></td>
          <td>Rs. ${product.price}</td>
        </tr>
        <tr>
          <td style="padding:8px;"><strong>Total Amount</strong></td>
          <td><strong>Rs. ${Totalamount}</strong></td>
        </tr>
      </table>

      <hr style="margin:30px 0;">

      <h3>Delivery Address</h3>

      <p>
        ${address.village}<br>
        ${address.tehsil}<br>
        ${address.district}<br>
        ${address.division}<br>
        ${address.province}
      </p>

      <hr style="margin:30px 0;">

      <p>
        <strong>Transaction ID:</strong> ${transactionId}
      </p>

      <p>
        📦 <strong>What's Next?</strong>
      </p>

      <ul>
        <li>Your payment will be verified.</li>
        <li>Your order will be packed carefully.</li>
        <li>You will receive another email once your order is confirmed or shipped.</li>
      </ul>

      <div style="margin-top:35px;padding:18px;background:#f8f8f8;border-left:4px solid #c8a96a;">
        <strong>Need Help?</strong><br><br>
        📧 Email: alluremensfashion@gmail.com
      </div>

      <p style="margin-top:40px;">
        Thank you for choosing <strong>Allure Mens Fashion</strong>.
      </p>

    </div>

    <div style="background:#111;color:#bbb;text-align:center;padding:15px;font-size:13px;">
      © ${new Date().getFullYear()} Allure Mens Fashion. All Rights Reserved.
    </div>

  </div>
</div>
`,
};


    try {
  await transporter.sendMail(mailOptions);
  await transporter.sendMail(customerMailOptions);
} catch (mailError) {

  return Response.json(
    {
      success: true,
      emailSent: false,
      message: "Order placed successfully, but we couldn't send the confirmation email.You can mail us to verify. Please send your name,email address used in order, date and time to alluremensfashion@gmail.com.",
    },
    { status: 201 }
  );
}



    return Response.json(
      { success: true, },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "" },
      { status: 500 }
    );
  }
}
