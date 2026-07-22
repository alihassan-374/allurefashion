import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
function page() {
  return (
    <div className='-fit flex flex-col'>
      <Navbar/>
      <div className='mt-17.5 min-h-[calc(100vh-70px)] bg-[#f8f6f2] flex flex-col'>
        <div className='ml-2 mt-4'>
            Hi, 
            <br/>
            <b>Welcome to AllUre Men's Fashion.</b>
             At AllUre , your experience matters to us. Whether you have a question about sizing , need help with your order, or just want to say hellp _ we're always here and ready to assist.
            <br/>
            We believe great style deserves great service. Reach Out through any of the options below and our team will get back to you within 24 hours.
        </div>
        <div className='flex flex-col gap-1'>
            <span className='text-lg font-bold '>
1.Need Quick Help?
            </span>
            <span className='ml-2'>
                For order inquiries, shipping updates, returns, or any urgent issue, email us direclty. This is fastest way to reach our support team.
            </span>
            <a href="mailto:alluremensfashion@gmail.com" className='border ml-4 active:scale-95 flex  border-black p-2 w-fit'>
                <span className='font-bold '>
                    Email Us:
                </span>
<Image src="/mail.svg" alt="mail" width={50} height={50}/>
            </a>
        </div>
        <div className='flex flex-col '>
        <span className='text-lg font-bold '>
2.Follow Our World.
            </span>
            <span>
                Style does not stop at checkout. Follow us for new drops, styling ips, behind-the-scenes, and exclusive offers.
            </span>
            <div className='flex flex-col ml-2'>
<span className='text-lg font-bold '>
TikTok
            </span>
            <span>
                See Out Latest fits, Styling videos , and trends drops.
            </span>
            <a href="mailto:alluremensfashion@gmail.com" className='border flex justify-center items-center ml-4 active:scale-95  border-black p-2 w-fit'>
                <span className='font-bold text-lg text-[#c8a96a]'>
                    Follow on TikTok
                </span>
<Image src="/tiktok.svg" alt="mail" width={40} height={40}/>
            </a>
            </div>
            <div className='flex flex-col ml-2'>
<span className='text-lg font-bold '>
Instagram
            </span>
            <span>
                Dailu style inspiration, new arrivals , and model shots. Tag us to get featured.
            </span>
            <a href="mailto:alluremensfashion@gmail.com" className='border flex justify-center items-center ml-4 active:scale-95  border-black p-2 w-fit'>
                <span className='font-bold text-lg text-[#c8a96a]'>
                    Follow on Instagram
                </span>
<Image src="/insta.svg" alt="mail" width={40} height={40}/>
            </a>
            </div>
            <div className='flex flex-col ml-2'>
<span className='text-lg font-bold '>
TikTok
            </span>
            <span>
Updates,giveaways, and community. Join the AllUre Family.
              </span>
            <a href="mailto:alluremensfashion@gmail.com" className='border flex justify-center items-center ml-4 active:scale-95  border-black p-2 w-fit'>
                <span className='font-bold text-lg text-[#c8a96a]'>
                    Like On Facebook
                </span>
<Image src="/Facebook.svg" alt="mail" width={40} height={40}/>
            </a>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page
