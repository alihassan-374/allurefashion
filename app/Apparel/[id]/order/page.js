"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

function QuickOrder() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams()
  const productId = params.id

  // Form state
  const [email, setemail] = useState("")
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [district, setDistrict] = useState("");
  const [division, setDivision] = useState("");
  const [province, setProvince] = useState("");
  const [TID, setTID] = useState("");
  const [error, seterror] = useState(true);
  const [quantity, setquantity] = useState("")
  const [product, setproduct] = useState({})
  const [payment, setpayment] = useState("")
  const [Check, setCheck] = useState(false)
  useEffect(() => {
    let findproduct = async (Id) => {
      try {
        const res = await fetch(`/api/admin/product/getone?Id=${Id}`)
        let data = await res.json()
        console.log(data)
        if (data.success) {
          setproduct(data.product)
          seterror("")
        } else {
          seterror("Product Not Fuound")
        }
      } catch (error) {
        seterror("Internal Server Error!If you are facing several errors please contact alluremensfashion@gamil.com.")
        console.log(error)
      }
    }
    findproduct(productId)
  }, [])



  useEffect(() => {
    if (status !== "loading" && !session) router.push("/signup");
  }, [session, status, router]);

  useEffect(() => {
    if (
      name &&
      phone &&
      village &&
      tehsil &&
      district &&
      division &&
      province &&
      TID &&
      Check
    ) {
      seterror(false);
    } else {
      seterror(true);
    }
  }, [name, phone, village, tehsil, district, division, province, TID]);


  if (!session) return null;

  const handleQuickOrder = async (e) => {
    e.preventDefault();
    // Order validation failed: Totalamount: Path `Totalamount` is required., product.productId: Path `product.productId` is required., email: Path `email` is required.
    const orderData = {
      productId: productId,
      name,
      phone,
      address: { village, tehsil, district, division, province },
      transactionId: TID,
      email: email,
      quantity,
    };

    try {
      const res = await fetch("/api/order/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Order placed successfully!");
        router.push(`/${session.email}`)
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Internal Server Error!");
    }
  };

  const totalamount = product.price + 300;

  return (
    <div className=" flex h-fit justify-between items-center flex-col">
      <Navbar />
      <div className="bg-[#f8f6f2] p-6 rounded-lg shadow-md max-w-sm mb-10 md:max-w-xl w-full mt-30">
        <h2 className="text-4xl font-bold mb-4 text-black mx-auto w-full">Order</h2>
        <p className="text-lg text-black">Please Enter following details to confirm your order
        </p>
        <p className="flex flex-col"><span className="font-bold text-black">Product Details</span>
          <span className="text-black">Price : Rs.{product.price}</span>
          <span className="text-black">Product Title:<span className="font-bold">{product.title}</span></span>
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleQuickOrder}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Email"
            value={email || session.email}
            onChange={(e) => setemail(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />

          <input
            type="text"
            placeholder="Village/Town/City"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Tehsil"
            value={tehsil}
            onChange={(e) => setTehsil(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Division/City"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            min={"1"}
            value={quantity}
            onChange={(e) => setquantity(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
            required
          />
          <select className="mb-3 p-1 rounded-lg outline-2 outline-black focus:outline-black w-[80%] bg-white text-black"
            name="payment" onChange={(e) => setpayment(e.target.value)} id="catogery">
            <option value={"Cash On Delivery"}>Cash On Delivery</option>
            <option value={"Full Payment!"}>Full Payment</option>
          </select>
          {payment === "Cash On Delivery" ? (
            <div className="text-black">
              Payment Method:
              COD (Cash on delivery)
              <div>
                Delivery Fee : PKR 300/-
              </div>
              <div>
                Payemnt Instruction:
                Pay the amount with help of Number 03037833380 . Name Amna Bashir . After your payment is done. You will get an Transiction ID. Enter Transaction ID to confirm your order. After verifying your Transaction ID You will receive an Email from us that your order is placed successfully and you will receive the anticipated date of order arrival in the Email.
              </div>
            </div>
          ) : (
            <div className="text-black">
              Payment Method:
              COD (Cash on delivery)
              <div>
                Rs.{product.price * quantity}/- + Rs.300/- = Rs.{totalamount}/-
                <br />Rs.300/- are delivery charges.
              </div>
              <div>
                Payemnt Instruction:
                Pay the amount with help of Number 03037833380 . Name Amna Bashir . After your payment is done. You will get an Transiction ID. Enter Transaction ID to confirm your order. After verifying your Transaction ID You will receive an Email from us that your order is placed successfully and you will receive the anticipated date of order arrival in the Email.
              </div>
            </div>
          )}

          <input
            type="text"
            placeholder="Transaction ID (if paid)"
            value={TID}
            onChange={(e) => setTID(e.target.value)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-green-500"
          />
          <div>
            <label htmlFor="terms">I agree to <a className="text-[#121212] underline" target="_blank" href="/terms">Terms & Condiions</a> and <a href="/privacypolicy" target="_blank" className="text-[#121212] underline">Privacy Policy</a></label>
            <input type="checkbox"
              required
              onChange={() => setCheck(!Check)}
              className="h-4 w-4 rounded border-[#c8a96a] text-black focus:ring-[#c8a96a]"
            />
          </div>
          <button
            disabled={error}
            type="submit"
            className="mt-4 active:scale-95 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            Buy Now
          </button>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
      <Footer/>
    </div>
  );
}

export default QuickOrder;
