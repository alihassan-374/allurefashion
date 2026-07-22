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
        } else {
          toast.info("Order Not Found!Please Order something!")
        }
      } catch (error) {
        toast.error("No Order found due to Internal Server Error!")
      }
    }
    async function getfav(email) {
      try {
        const res = await fetch(`/api/user/favourite/get?email=${email}`)
        const data = await res.json()
        if (data.success) {
          setfav(data.favourite)
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
        Order.filter(i => i._id !== id)
      } else {
        toast.info("Could Not Delete Order.Try Again!")
      }
    } catch (error) {
      toast.error("Internal Server Error!")
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
          Welcome to Alure <span className='font-bold'>{Name}</span>
        </div>
        <div className='flex flex-col w-[95vw] justify-center ' >
          <div className=' shadow-md w-[90vw]'>
            <span onClick={() => setgridcol(true)
            } className='text-xl  font-bold  '>
              My Orders
              <span onClick={() => setgridcol(true)
              } className='material-symbol-outlineed'>{gridcol ? "expand_less" : "expand_more"}
              </span>
            </span>
            <div className={`grid justify-center items-center md:grid-cols-3 grid-cols-1 ${gridcol ? "block" : "hidden"}`}>
              {Order.map((item, index) => (
                <div className="md:w-[30vw] w-[90vw] flex flex-col p-4 shadow-md" key={index}>
                  <Image src={getValidImageUrl(item.mainimgl || item.img, item._id || index)} alt="Image" className='md:w-[25vw] border-2 border-[#121212] rounded-lg w-[90vw] h-[30vh]' width={100} height={100}
                    onError={() => handleImageError(item._id || index)} />
                  <span className='font-bold text-xl'>{item.product.title}</span>
                  <span className="font-semibold text-lg">Rs.{item.Totalamount}/-</span>
                  <span className='text-sm'>{"No Date"}</span>
                  <button onClick={() => deleteOrder(item._id)} className='bg-[#c8a96a] rounded-lg  hover:text-md active:scale-90 hover:font-bold p-2 mt-2'>
                    Cancel Order
                  </button>
                </div>)
              )}
            </div>
          </div>
          <div className='flex flex-col justify-center w-[90vw] shadow-md'>
            <span onClick={() => setgridcol(false)} className="text-xl font-bold">
              My Favourites
              <span onClick={() => setgridcol(false)
              } className='material-symbol-outlineed'>{gridcol ? "expand_more" : "expand_less"}
              </span>
            </span>
            <div
              className={`flex flex-col ${gridcol ? "hidden" : "block"}`}>
              {fav.map((item, index) => (
                <div className="md:w-[30vw] w-[90vw] flex flex-col p-4 shadow-md" key={index}>
                  <Image src={getValidImageUrl(item.mainimgl || item.img, item._id || index)} alt="Image" className='md:w-[25vw] border-2 border-[#121212] rounded-lg w-[90vw] h-[30vh]' width={100} height={100}
                    onError={() => handleImageError(item._id || index)} />
                  <span className='font-bold text-xl'>{item.title}</span>
                  <button className='bg-[#c8a96a] rounded-lg  hover:text-md active:scale-90 hover:font-bold p-2 mt-2'>
                    Remove Favourite
                  </button>
                </div>)
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default page
