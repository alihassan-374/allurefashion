import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function page() {
    return (
        <div className='min-h-screen bg-[#f8f6f2] text-[#121212]'>
            <Navbar />
            <div className='min-h-[calc(100vh-70px)] gap-1 flex p-2 flex-col '>
                <span className='text-4xl md:text-6xl mx-auto   mt-8 text-[#121212] font-bold'>
                    Terms & Condition
                </span>
                <span className='text-2xl font-bold'>
                    Terms & Conditions
                </span>
                <span className='text-lg font-bold ml-2'>
                    1.Agreement
                </span>
                <span>
                    By using our website, you agree to be bound by these Terms.
                </span>
                <span className='text-lg font-bold ml-2'>
                    2.Products
                </span>
                <span className='font-bold'>
                All products on AllUre are curated by us. We are not manufacturer. We partner with permium manufacturers worldwide to bring you curated pieces.
                </span>
                <span>
                    Product images are for illustration. Colors and sizes may vary slightly.
                </span>
                <span className='text-lg font-bold ml-2'>
3.Pricing & Payment
                </span>
                <span>
                    All prices are in PKR. We accept COD and online payments. Prices are subject to change without notices.
                </span>
                <span className='text-lg font-bold ml-2'>
                    4.Order Acceptance
                </span>
                <span>
                    We reserve the right to refuse or cancel any order for any reason, including product availability or errors in pricing.
                </span>
                <span className='text-lg font-bold ml-2'>
                    5.Shipping
                </span>
                <span className='font-bold'>
                Please note shipping times are longer as longer items are shipped directly from our suppliers.
                </span>
                <span>
                    Processing Time:3-7 business days.
                </span>
                <span>
                    Delivery Time:10-20 business days in Paksitan, 15-25 business days worldwide.
                </span>
                <span>
                    Delays caused by customers, courier, or supplier are beyond our control.
                </span>
                <span className='text-lg font-bold ml-2'>
                    6.Retruns & Liability
                </span>
                <span>
                Returns are accepted only for Damaged, Defective, or Wrong items. See oue Shipping & Returns policy.
                </span>
                <span>
                    Allure is not liable for supplier delays or courier issues.
                </span>
                <span className='text-lg font-bold ml-2'>
                    7.Contact
                </span>
                <span>
                    Questions? Email Us At:
                </span>
                <a href='mailto:alluremensfashion@gmail.com'>
alluremensfashion@gmail.com
                </a>
            </div>
            <Footer />
        </div>
    )
}

export default page
