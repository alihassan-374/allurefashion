"use client";
import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image';
import Loader from '../components/Three/Loader';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
function page() {
  const [product, setproduct] = useState([])
  const [error, seterror] = useState(false)
  const [errormessage, seterrormessage] = useState("")
  const [loading, setloading] = useState(true)
  const [search, setsearch] = useState("")
  const [ImageError, setImageError] = useState({})
  const [searchToggle, setsearchToggle] = useState(false)
  useEffect(() => {

    const findproduct = async () => {
      try {
        let res = await fetch("/api/admin/product/get")
        let data = await res.json()
        console.log(data)
        if (data.success) {
          await setproduct(data.product.filter((p) => p.catogery === "Accessories"))
          console.log(product)
        } else {
          seterror(true);
          seterrormessage("Product Not Found!")
        }
      } catch (error) {
        console.log(error)
        seterror(true);
        seterrormessage("Internal Server Error!If you are facing several errors please contact alluremensfashion@gmail.com.")
      }
    }
    findproduct()
    setTimeout(() => {
      setloading(false)
    }, 2000);
  }, [])

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

  
  const filterdproduct = product.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())) || item.description?.toLowerCase().includes(search.toLowerCase())
  console.log(search)
  console.log(filterdproduct)

  return (
    <div className='h-fit overflow-x-hidden'>
      {loading  ? <loader/>:(
<div>
  
          <p className='md:text-sm text-[8px] text-[#f8f6f2] text-center bg-[#121212] font-semibold'>
All prices are in PKR.Products belongs to our trusted partners. Products are dropshipped via us.
          </p>
        <Navbar />
      <div className=' min-h-[calc(100vh-70px)]  h-fit flex flex-col bg-[#f8f6f2] justify-center items-center'>
        {/* Upper Items */}
        <div className='flex flex-col justify-center mt-17.5 items-center'>
          <h1 className='md:text-6xl garamond text-4xl mt-2 font-bold text-[#121212]'>
            Accessories
          </h1>
        </div>
        <div className='my-4 flex w-fit'>
          <input type='search'
            onClick={() => setsearchToggle(true)}
            className="rounded-lg border text-black px-3 py-2 focus:outline-[#c8a96a]" value={search} placeholder='Enter Your Search' onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        {/* Prodcuts Grid */}
        {searchToggle ? (
          <div>
            {filterdproduct.length > 0 ?
              (<div className='grid grid-cols-1 md:grid-cols-3 gap-2 w-[95vw]'>
                {filterdproduct.map((item, index) => (
                  <div key={index} className='rounded-lg border-2 border-[#121212] md:w-[25vw] mx-2 w-[90vw] flex flex-col'>
                    <div>
                      <img 
                        src={getValidImageUrl(item.mainimgl || item.img, item._id || index)} alt="Image"  width={1200} height={1500}
                        onError={() => handleImageError(item._id || index)} className="w-full h-full object-cover rounded-lg hover:scale-100 transition-transform duration-300" />
                    </div>
                    <div className='bg-[#121212]  mx-auto w-full'>
                      <h2 className='text-lg font-bold text-[#f8f6f2] ml-4 garamond'>{item.title}</h2>
                      <h3 className='text-lg font-bold text-[#f8f6f2] ml-4 garamond'>Rs.{item.price}/-</h3>
                      <div className='button mt-4 w-full flex flex-row justify-between items-center'>
                        <a href={`/Accessories/${item._id}`} className='bg-[#c8a96a] rounded-lg  hover:text-md w-full hover:font-bold p-2 active:scale-90'>
                          View More
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>)
              :
              (<div>
                No product found for {search}
              </div>)}
          </div>
        ) : (

          <div>
            {error ? (
              // Error Message
              <div>
                {errormessage || "Products Not Found!"}
              </div>
            )
              :
              (
                // Grid of Prodcuts
                <div className='grid grid-cols-1 md:grid-cols-3 p-2 w-[95vw] gap-1 '>
                  {product.map((item, index) => (
                     <div key={index} className='rounded-lg border-2 border-[#121212] md:w-[25vw] mx-2 w-[90vw] flex flex-col'>
                    <div>
                      <img 
                        src={getValidImageUrl(item.mainimgl || item.img, item._id || index)} alt="Image"  width={1200} height={1500}
                        onError={() => handleImageError(item._id || index)} className="w-full h-full object-cover rounded-lg hover:scale-100 transition-transform duration-300" />
                    </div>
                    <div className='bg-[#121212]  mx-auto w-full'>
                      <h2 className='text-lg font-bold text-[#f8f6f2] ml-4 garamond'>{item.title}</h2>
                      <h3 className='text-lg font-bold text-[#f8f6f2] ml-4 garamond'>Rs.{item.price}/-</h3>
                      <div className='button mt-4 w-full flex flex-row justify-between items-center'>
                        <a href={`/Accessories/${item._id}`} className='bg-[#c8a96a] rounded-lg  hover:text-md w-full hover:font-bold p-2 active:scale-90'>
                          View More
                        </a>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )

            }
          </div>
        )}
      </div>
      <Footer/>
      </div>
      )}
    </div>
  )
}

export default page

