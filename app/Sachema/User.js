import mongoose from "mongoose";

const UserSachema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  passwordHash: { type: String },
  provider: { type: String, enum: ["email", "google"], default: "email" },
  isVerified: { type: Boolean, default: false },
  favourite: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "AddProduct" },
      title: String,
        price: Number,
        mainimg: String,
    }
  ]
}, { timestamps: true }
)

export default mongoose.models.User || mongoose.model("User", UserSachema)