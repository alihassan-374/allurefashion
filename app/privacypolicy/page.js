import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function page() {
    return (
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-70px)] flex p-2 flex-col gap-1 '>
                <span className='text-4xl md:text-6xl  mt-8 text-[#121212] mx-auto font-bold'>
                    Privacy Policy
                </span>
                <span className='text-2xl font-bold'>
                    Privacy Policy for AllUre
                </span>
                <span>
                    Last Updated:22 July,2026.
                </span>
                <span>
                At <span className='font-bold'>AllUre</span>, your privacy is important to us. This Privacy Policy explains how we collect,use and protect your information.
                </span>
                <span className='text-lg font-bold '>
1. Information We Collect:
                </span>
                <span>
                    We collect information you provide when you place an order or login/signup:
                </span>
                <span>
                    Name,Address,Email,Phone Number,Shipping Address,Payment Information.
                </span>
                <span>
                    We also may collect automatically like: browser-type,cookies for better experience.
                </span>
                <span className='text-lg font-bold '>
                    2.How we Use Your Information:
                </span>
                <span className='ml-2'>
                To process and fulfill your orders
                </span>
                <span className='ml-2'>
                To send order updates and shipping notifications
                </span>
                <span className='ml-2'>
                To improve oue website and customer experience
                </span>
                <span className='ml-2'>
                To send marketing emails if you opt-in. You can unsubcribe anytime.
                </span>
                <span className=''>
3.Cookies
                </span>
                <span>
                    We Use cookies for better experience and analyze site traffic.
                </span>
                <span className='text-lg font-bold '>
                    $.Third Parties & Dropshipping Discosure
                </span>
                <span className='font-bold'>
                Your Order will be fulfilled by our trusted third-party suppliers. Your Name, shipping address and phone number will be shared with solely fot delivery purpose.
                </span>
                <span>
                    We also share information with courier companies. We do not sell your personal data.
                </span>
                <span className='text-lg font-bold '>
                5. Data Security
                </span>
                <span>
                    Our webiste use SSL security to protect your information.
                </span>
                <span className='text-lg font-bold '>
                Your Rights
                </span>
                <span>
                    You can request access to, correction, or deletion of your personal data by conntacting us.
                </span>
                <span className='text-lg font-bold '>
                Contact Us:
                </span>
                <span>
                    For any questions about this policy:
                </span>
                <a className='text-[#121212] underline-[0px] ' href='mailto:alluremensfashion@gmail.com'>
                alluremensfashion@gmail.com
                </a>
            </div>
            <Footer />
        </div>
    )
}

export default page
