"use client";
import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'
import { toast, ToastContainer } from 'react-toastify';
function page() {
  let { data: session, status } = useSession();
  const router = useRouter()
  const [Name, setName] = useState("Guest")
  const [gridcol, setgridcol] = useState(true)
  const [gridcol2, setgridcol2] = useState(true)
  const [Order, setOrder] = useState([])
  const [ImageError, setImageError] = useState({})
  const [fav, setfav] = useState([])
  console.log(session)
  useEffect(() => {
    if (status === "unauthenticated") router.push("/signup");
    if (status === "loading") return;

    if (status === "authenticated") {
      const emailName = session?.user?.email.split("@")[0]
      setName(emailName)
    }
  }, [session, status, router]);
  useEffect(() => {
    async function getorder(emailName) {
      try {
        const res = await fetch(`/api/user/order/get?email=${emailName}`)
        const data = await res.json();
        if (data.success) {
          setOrder(data.Orderdetail);
        } else if(data.message === "Internal Server Error!"){
          toast.info("Internal Server Error!")
        }
        if(Order.length > 0){
          setgridcol(false)
        }else{
          setgridcol(true)
        }
        if(fav.length > 0){
          setgridcol(false)
        }else{
          setgridcol(true)
        }
      } catch (error) {
        toast.error("Internal Server Error!")
      }
    }
    async function getfav(email) {
      try {
        const res = await fetch(`/api/user/favourite/get?email=${email}`)
        const data = await res.json()
        if (data.success) {
          setfav(data.favourite)
          console.log(data.favourite)
        } else (
          toast.info("Please Add something into Favourites")
        )
      } catch (error) {
        toast.info("Internal Server Error!")
      }
    }
    if(status==="authenticated"){
    getorder(session?.user?.email)
    getfav(session?.user?.email)}

  }, [status])
  async function deleteOrder(id) {
    try {
      const res = await fetch(`/api/user/order/delete?id=${id}`, {
        method: "DELETE"
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Deleted Successfully!")
          setOrder(prev => prev.filter(i => i.prodcutId !== id));
      } else {
        toast.info("Could Not Delete Order.Try Again!")
      }
    } catch (error) {
      toast.error("Internal Server Error!")
    }
  }

  async function deletefav(id){
try {
      if (status === "authenticated") {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          email: session.user.email,
          productId: id
        });
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        const res = await fetch("/api/user/favourite/delete", requestOptions);
        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          setfav(prev => prev.filter(i => i._id !== id));
        } else {
          toast.error(data.message)
        }
      } else {
        router.push("/singup")
      }
    } catch (error) {
      toast.error("Internal Server! If you are facing several errors please contact alluremensfashion@gmail.com")
    }
  }

  const getValidImageUrl = (url, itemId) => {
    // If already marked as error, return default
    if (ImageError[itemId]) {
      return "/AllUre.png"
    }

    // Check if URL is valid
    if (!url || url.trim() === "") {
      return "/AllUre.png"
    }

    try {
      // Try to construct URL to validate
      new URL(url, window.location.origin)
      return url
    } catch (e) {
      console.error(`Invalid URL for item ${itemId}:`, url)
      return "/AllUre.png"
    }
  }

  const handleImageError = (itemId) => {
    setImageError(prev => ({
      ...prev,
      [itemId]: true
    }))
  }



  return (
    <div className='min-h-screen bg-[#f8f6f2] flex flex-col  text-[#121212]'>
      <Navbar  />
      <div className='min-h-[calc(100vh-70px)] p-6 mt-17.5 flex flex-col'>
        <div className='text-2xl text-center mb-3 w-[90vw]'>
          Welcome to AllUre <span className='font-bold'>{Name}</span>
        </div>
        <div className='flex flex-col w-[95vw] gap-4 justify-center ' >
          <div className=' shadow-md w-[90vw] '>
            <span onClick={() => setgridcol(!gridcol)
            } className='text-xl flex justify-center items-center cursor-pointer text-left  font-bold  '>
              My Orders
              <span onClick={() => setgridcol(!gridcol)
              } className='material-symbol-outlineed cursor-pointer'>{gridcol ? <span className="material-symbols-outlined">
arrow_drop_up
</span> : <span className="material-symbols-outlined">
arrow_drop_down
</span>}
              </span>
            </span>
            {
              Order.length > 0 ? (
                <div className={`grid justify-center items-center md:grid-cols-3 gap-2 grid-cols-1 ${gridcol ? "block" : "hidden"}`}>
              {Order.map((item, index) => (
                <div className="md:w-[30vw] border-[#121212] border-2 rounded-lg w-[90vw] flex flex-col shadow-md" key={index}>
                  <Image src={getValidImageUrl(item.mainimgl || item.img, item._id || index)} alt="Image" className='md:w-[25vw]  rounded-lg w-[90vw] h-[40vh]' width={100} height={100}
                    onError={() => handleImageError(item._id || index)} />
                    <div className='flex flex-col bg-[#121212] p-1 justify-center items-center text-[#f8f6f2]'>
                  <span className='font-bold text-xl'>{item.product.title}</span>
                  <span className="font-semibold text-lg garamond">Rs.{item.Totalamount}/-</span>
                  <span className='text-sm'></span>
                  <button onClick={() => deleteOrder(item._id)} className='bg-[#c8a96a] rounded-lg text-[#121212] hover:text-md active:scale-90 hover:font-bold p-2 mt-2'>
                    Cancel Order
                  </button>
                    </div>
                </div>)
              )}
            </div>
              ):(
                
                <div className={`h-[40vh] flex justify-center items-center ${gridcol ? "block" : "hidden"}`}>
<p>
                  No Order Avalible.Please Order Some products.
                  <a href='/#product' className='underline'>
                  Order Now
                  </a>
                </p>
                </div>
            
              )
            }
          </div>
          <div className='flex flex-col justify-center w-[90vw] shadow-md'>
            <span onClick={() => setgridcol2(!gridcol2)} className="text-xl font-bold flex justify-center items-center cursor-pointer text-left">
              My Favourites
              <span onClick={() => setgridcol2(!gridcol2)
              } className='material-symbol-outlineed cursor-pointer'>{gridcol2 ? <span className="material-symbols-outlined">
arrow_drop_down
</span> : <span className="material-symbols-outlined">
arrow_drop_up
</span>}
              </span>
            </span>
            {
              fav.length > 0 ? (
               
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${gridcol2 ? "hidden" : "block"}`}>
              {fav.map((item, index) => (
                <div className="md:w-[30vw] w-[90vw] border border-[#121212] rounded-md flex flex-col p-4 shadow-md" key={index}>
                  <Image src={getValidImageUrl(item.mainimgl || item.img, item._id || index)} alt="Image" className='md:w-[25vw]  rounded-lg w-[90vw] h-[40vh]' width={100} height={100}
                    onError={() => handleImageError(item._id || index)} />
                    <div className='flex flex-col bg-[#121212] p-1 justify-center items-center '>
                  <span className='font-bold text-xl text-[#f8f6f2] text-left w-full p-1'>{item.title}</span>
                  <a className='bg-[#c8a96a] rounded-lg   hover:text-md active:scale-90 hover:font-bold w-full p-2 text-center mt-2' href={`/${item.catogery}/${item.productId}`}>
                  Buy Now
                  </a>
                  <button onClick={()=>deletefav(item.productId)} className='bg-[#c8a96a] rounded-lg  hover:text-md w-full active:scale-90 hover:font-bold p-2 mt-2'>
                    Remove Favourite
                  </button>
                    </div>
                </div>)
              )}
            </div> 
              ):(
                
                <div className={`h-[40vh] flex justify-center items-center ${gridcol2 ? "block" : "hidden"}`}>
<p>
                  No Favourite items Avalible.Prefer your choice now.
                  <a href='/#product' className='underline'>
                  Add Favourite
                  </a>
                </p>
                </div>
              ) 
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default page
