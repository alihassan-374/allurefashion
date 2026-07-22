import mongoose from "mongoose";

const OrderSachema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: {
        village: { type: String, required: true },
        tehsil: { type: String, required: true },
        district: { type: String, required: true },
        division: { type: String, required: true },
        province: { type: String, required: true },
    },
    product: {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        title: String,
        price: Number,
        quantity :Number,
        mainimg: String,
    },
    transactionId: {
        type: String,
        required: true,
    },
    Totalamount : {
        type:Number,
        required : true
    }},
    { timestamps: true },
)

export default mongoose.models.Order || mongoose.model("Order",OrderSachema)