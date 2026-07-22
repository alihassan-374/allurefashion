import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
function Footer() {
  return (
    <div className='bg-[#c8a96a] mt-10 pr-0 max-w-screen p-8 flex justify-center items-center m-0  gap-4 flex-col text-[#121212]' >
      <span>Copyright © 2026 AllUre. All rights reserved.</span>
      <span>Made with &hearts; by <Link href={"https://www.instagram.com/maskedcodingwithali/?hl=en"}>Ali Hassan</Link></span>

      <div className='flex justify-around w-full'>
        <ul>
          <li className='hover:underline hover:font-bold'><Link href={"/"} >Home</Link></li>
          <li className='hover:underline hover:font-bold'><Link href={"/Apparel"} >Apparel</Link></li>
          <li className='hover:underline hover:font-bold'><Link href={"/Accessories"} >Accessories</Link></li>
          <li className='hover:underline hover:font-bold'><Link href={"/Grooming"} >Grooming</Link></li>
          <li className='hover:underline hover:font-bold'><Link href={"/contact"} >Contact</Link></li>
        </ul>
        <ul>
          <li className='hover:underline hover:font-bold'><Link href={"/signup"} >Sign Up</Link></li>
          <li className='hover:underline hover:font-bold'><Link href={"/login"} >Login</Link></li>
        </ul>
        <ul>
          <li className='hover:underline hover:font-bold'><Link href={"/terms"} >Terms & Condition</Link></li>
          <li className='hover:underline hover:font-bold'><Link href={"/shippingandreturnpolicy"} >Shipping & Return Policy</Link></li>
          <li className='hover:underline hover:font-bold'><Link href={"/privacypolicy"} >Privacy Policy</Link></li>
        </ul>
      </div>
      <ul className='flex gap-4'>
        <Link href={"/"}><li><Image className='invert-100' src="/insta.svg" width={20} height={20} alt='social-media-icon' /></li></Link>
        <Link href={"/"}><li><Image className='invert-100' src="/facebook.svg" width={20} height={20} alt='social-media-icon' /></li></Link>
        <Link href={""}><li><Image className='invert-100' src="/tiktok.svg" width={20} height={20} alt='social-media-icon' /></li></Link>
        <Link href={"mailto:alluremensfashion@gmail.com"}><li><Image className='invert-100' src="/mail.svg" width={35} height={35} alt='social-media-icon' /></li></Link>
      </ul>
    </div>

  )
}

export default Footer
