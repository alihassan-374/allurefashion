"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const [drop, setdrop] = useState(false)
  const [open, setopen] = useState(true)
  const {data:session ,status}  = useSession();
  const [name, setname] = useState("")
  useEffect(() => {
    if(status==="unauthenticated"){
      setname("")
    }else{
    const nam = session?.user.email.split("@")[0]
    setname(nam)}
  }, [session,status])
  
  return (
    <div className="m-0 z-30 sticky lg:w-[1263px] w-[100ve] px-4 bg-[#c8a96a] flex justify-between items-center" >
      <div className="logo md:px-2 justify-center items-center flex gap-2">
        <Image src="/AllUre.png" className='md:scale-100 scale-75' alt="Logo" width={70} height={70} />
        <span className="md:text-2xl text-xl font-bold">AllUre</span>
        <span className="md:text-lg text-[8px] mt-2">The Art Of Attraction</span>
      </div>
      <button
        onClick={() => setopen(!open)}
        className="md:hidden block mr-6 text-[#121212] focus:outline-none"
      >
        <span className="material-symbols-outlined text-3xl">
          {open ? "close" : "menu"}
        </span>
      </button>
<div className={`${open ? "flex" : "hidden"
          } flex-col md:flex md:flex-row md:static absolute top-20 right-0 md:top-0 md:right-auto 
        bg-[#c8a96a] border-2 md:border-none border-[#121212] md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none 
        items-center w-[70vw] md:w-fit gap-4 md:gap-6 transition-all duration-300`}>
    <a href='/' className="font-bold hover:underline cursor-pointer hover:scale-120">Home</a>
    <span className="font-bold hover:underline cursor-pointer hover:scale-120">
      <button
        onClick={() => setdrop(!drop)}
        className="flex justify-center items-center cursor-pointer"
      >
        <span>Prodcuts</span> <span className="material-symbols-outlined">
keyboard_arrow_down
</span>
      </button>

      {drop && (
        <div className="absolute mt-2 w-56 rounded-lg cursor-pointer bg-[#f8f4f2] shadow-lg border">
          <a href="/Apparel" className="block px-4 py-2 hover:bg-white">
            Apparel
          </a>

          <a href="/Accessories" className="block px-4 py-2 hover:bg-white">
            Accessories
          </a>

          <a href="/Grooming" className="block px-4 py-2 hover:bg-white">
            Grooming
          </a>
        </div>
      )}
    </span>
    <a href="/about" className="font-bold hover:underline cursor-pointer hover:scale-120">About Us</a>
    <a href='/contact' className="font-bold hover:underline cursor-pointer hover:scale-120">Contact</a>
    {name? (
      <span className='flex gap-2 justify-center items-center'>
      <a className="font-bold hover:underline cursor-pointer hover:scale-120" href={`/${name}`}>{name}</a>
      <span onClick={()=>signOut()} className='className="font-bold hover:underline cursor-pointer hover:scale-120"'>LogOut</span>
      </span>
    ):(
      <span className='flex justify-center items-center gap-2'>
      <a href="/signup" className="font-bold hover:underline cursor-pointer hover:scale-120">Sign Up</a>
      <a href="/login" className="font-bold hover:underline cursor-pointer hover:scale-120">Login</a>
      </span>
    )}
    </div>
    </div>
  )
}

export default Navbar
