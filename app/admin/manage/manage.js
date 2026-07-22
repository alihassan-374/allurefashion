"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [mainimg,setmainimg ] = useState("");
  const [desc, setdesc] = useState("");
  const [catogery, setcatogery] = useState("Apparel")
  const [products, setproducts] = useState([])
  const [ seondimg, setseondimg] = useState("")
  const [ thirdimg, setthirdimg] = useState("")
const [order, setorder] = useState([])
  useEffect(() => {
    const findproducts = async () => {
      try {
        const res = await fetch("/api/admin/product/get")
        const data = await res.json()
        console.log(data)
        if (data.success) {
          setproducts(data.product)
          console.log(products)
            toast(data.message) 
        } else {
          toast.info(data.message)
        }
      } catch (error) {
        toast.error(error)
      }

    }
    findproducts()
  }, [])


const handleedit = async (id) => {
  if (!confirm("Are you sure you want to edit this product?")) return;

  try {
    // Delete the product from DB
    const res = await fetch(`/api/admin/product/delete?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      // Remove from UI
      let product = products.find(p => p._id === id);
      // Fill form inputs
      setTitle(product.title);
      setdesc(product.desc);
      setmainimg(product.mainimg);
      setPrice(product.price);
      setseondimg(product.seondimg)
      setthirdimg(product.thirdimg)
      setproducts(products.filter(p => p._id !== id));
      toast.success("Product ready to edit!");
      console.log("success")
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const handledeleteorder = async (id) => {
  if (!confirm("Are you sure you want to delete this Order?")) return;

  try {
    const res = await fetch(`/api/admin/order/delete?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json(); // parse JSON response

    if (data.success) {
      toast.success(data.message);
      // Remove deleted product from UI
      setproducts(products.filter((p) => p._id !== id));
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
};
const handledelete = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch(`/api/admin/product/delete?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json(); // parse JSON response

    if (data.success) {
      toast.success(data.message);
      // Remove deleted product from UI
      setproducts(products.filter((p) => p._id !== id));
    } else {
      toast.error(data.error);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  const handlesubmit = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "title": title,
      "price": parseFloat(price),
      "mainimg": mainimg,
      "desc": desc,
      "catogery": catogery,
      "secondimg": seondimg,
      "thirdimg": thirdimg,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const res = await fetch("/api/admin/product/add", requestOptions)
    const result = await res.json();
    if (result.success) {
      setTitle("");
      setPrice("");
      setmainimg("");
      setdesc("");
      setcatogery("shirts");
      setseondimg("")
      setthirdimg("")
      toast.success("Product Added!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error(result.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

useEffect(() => {
  const handlegetorder = async () => { 
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    const r = await fetch("/api/admin/order/get", requestOptions);
    const result = await r.json();

    if(result.success){
      toast.success("Orders Found");
      setorder(result.order || []); 
      console.log(order)
    }else{
      toast.info(order.message)
    }
  };

  handlegetorder();
}, []);



  
  return (
    <div className="flex w-full flex-col text-[#121212] bg-[#f8f6f2] justify-center items-center h-fit">
      <Navbar/>
      <h1 className="md:text-5xl text-3xl mt-30 w-fit font-bold rounded-lg p-1">
        Admin Management Page
      </h1>
      <div>
        <nav>
          <ul className=" text-xl flex gap-2 p-2 mt-4 m-2 rounded-lg ">
            <li className="hover:invert-100   rounded-lg p-1"><a className="scroll-smooth" href="#addproducts">Add products</a></li>
            <li className="hover:invert-100   rounded-lg p-1"><a className="scroll-smooth" href="#manageproducts">Manage products</a></li>
            <li className="hover:invert-100   rounded-lg p-1"><a className="scroll-smooth" href="#order">Orders</a></li>
          </ul>
        </nav>
      </div>
      <section id="addproducts" className="min-h-screen">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl w-fit mt-10 mb-5 font-semibold   p-1 rounded-lg">
            Manage Products
          </h2>
          <h3 className="text-xl text-center w-fit self-center   p-1 rounded-lg">
            Add Product
          </h3>
        </div>

        <form
          onSubmit={handlesubmit}
          className="flex flex-col justify-center items-center mt-5 mb-10  w-[90vw]"
        >
          <input
            type="text"
            name="title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product Title"
            required
            className="mb-3 p-1 rounded-lg outline-2 outline-black focus:outline-black w-[80%] bg-white text-black"
          />
          <input
            type="number"
            name="price"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            required
            className="mb-3 p-1 rounded-lg outline-2 outline-black focus:outline-black w-[80%] bg-white text-black"
          />
          <select className="mb-3 p-1 rounded-lg outline-2 outline-black focus:outline-black w-[80%] bg-white text-black"
           name="catogery" onChange={(e)=>setcatogery(e.target.value)} id="catogery">
            <option value= {"Apparel"}>Apparel</option>
            <option  value= {"Accessories"}>Accessories</option>
            <option  value= {"Grooming"}>Grooming</option>
          </select>
          <input
          type="text"
          name="image"
          value={mainimg || ""}
          placeholder="Enter Image URL"
          onChange={(e)=>setmainimg(e.target.value)}
          required
          className="mb-3 p-1 rounded-lg outline-2 outline-black focus:outline-black w-[80%] bg-white text-black"
          />
          <input
          type="text"
          name="suppimage1"
          value={ seondimg || ""}
          placeholder="Enter 1st supporting Image URL"
          onChange={(e)=>setseondimg(e.target.value)}
          required
          className="mb-3 p-1 rounded-lg outline-2 outline-black focus:outline-black w-[80%] bg-white text-black"
          />
          <input
          type="text"
          name="suppimage2"
          value={ thirdimg || ""}
          placeholder="Enter 2nd supporting Image URL"
          onChange={(e)=>setthirdimg(e.target.value)}
          required
          className="mb-3 p-1 rounded-lg outline-2 outline-black focus:outline-black w-[80%] bg-white text-black"
          />
          <textarea
            name="desc"
            value={desc || ""}
            onChange={(e) => setdesc(e.target.value)}
            placeholder="Product desc"
            required
            className="mb-3 p-1 rounded-lg outline-2 outline-black focus:outline-black w-[80%] bg-white text-black"
          ></textarea>

          <button
            type="submit"
            className="bg-[#c8a96a] rounded-lg  hover:text-md active:scale-90 hover:font-bold p-2 mt-2"
            >
            Add Product
          </button>
        </form>
      </section>
        <div className="h-1 bg-[#c8a96a] w-full"></div>
      <section id="manageproducts" className="min-h-screen w-screen flex justify-center items-center flex-col ">
        <div className="text-3xl font-bold text-black">Manage Products</div>
        {products?.length === 0 ? (
          <p className="text-3xl font-bold">Products Not Found</p>
        ) : (
          <div className="w-[98vw] grid md:grid-cols-3 grid-cols-1 justify-center items-center flex-col">
            {products?.map(i => (
              <div key={i._id} className="flex border-2 border-[#121212] rounded-2xl
               flex-col justify-between max-w-fit min-w-[60%] w-fit bg-[#c8a96a] rounded-lg p-1  mt-10  items-center">
                <div><Image src={i.mainimg} height={100} width={100} alt="product-image" /></div>
               <div className="flex h-fit flex-col justify-center items-center w-fit ">
                <div className="text-2xl font-bold ">{i.title}</div>
                <p className="w-[40%]  h-auto wrap-normal">{i.desc}</p>
                <span>Catogery : {i.catogery}</span>
                </div>
                <div className="text-gray-200">Rs.{i.price}</div>
                <div className="flex gap-2">
                    <span onClick={()=>handleedit(i._id)} className="material-symbols-outlined cursor-pointer active:scale-95">edit</span>
                    <span onClick={()=>handledelete(i._id)} className="material-symbols-outlined cursor-pointer active:scale-95">delete</span>
                </div>
              </div>
            ))}
          </div>
        )

        }
      </section>
      <div className="h-1 w-full "></div>
      <section id="order" className="my-4">
        <div>{ order?.length == 0 ? <div>No Order Found</div> : 

  <div className=" w-screen">
    <div className="my-6 font-bold text-2xl mx-auto w-fit ">Orders :</div>
    {order?.map((o) => (
      <div key={o._id} className="p-4 w-[50%] text-xl font-semibold mx-auto container border mb-4">
        <p>Name: {o.name}</p>
        <p>Phone: {o.phone}</p>

        <h3>Items:</h3>
          <div className="ml-4">
            <p>Title: {o.product.title}</p>
            <p>Price: {o.product.price}</p>
            <p>Qty: {o.product.quantity}</p>
          </div>
        

        <p>Total: {o.totalAmount}</p>
        <span onClick={()=>handledeleteorder(o._id)} className="material-symbols-outlined cursor-pointer active:scale-95">delete</span>
      </div>
    ))}
  </div>
  }      
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
