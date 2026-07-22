import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function page() {
    return (
        <div className='bg-[#f8f6f2] text-[#121212]'>
            <Navbar />
            <div className='flex flex-col gap-1 '>
                <span className='text-4xl md:text-6xl p-2  mt-8 text-[#121212] mx-auto font-bold'>
                    Shipping & Returns Policy
                </span>
                <span className='text-2xl font-bold'>
                    Shipping & Returns Policy for AllUre
                </span>
                <span>
                    We want you to love your order. Here's how shipping and returns work:
                </span>
                <span className='text-2xl font-bold'>
                    SHIPPING POLIICY
                </span>
                <span className='text-lg font-bold ml-2'>
                    1.Processing Time:
                </span>
                <span>
                    3-7 business days. Orders are made-to-order and shipped from our suppliers.
                </span>
                <span className='text-lg font-bold ml-2'>
                    2.Delivery Time
                </span>
                <span>
                    Pakistan : 10-20 days.
                </span>
                <span>
                    Internatioanl : 15-25 days
                </span>
                <span className='text-lg font-bold ml-2'>
                    3.Tracking:
                </span>
                <span>
                    You will receive a trecking number via email once your order ships.
                </span>
                <span className='text-lg font-bold ml-2'>
                    4.Shipping Fee
                </span>
                <span>
                    Free shipping on order over Rs.10000/-.Other wise Rs.300/-
                </span>
                <span className='text-2xl font-bold'>
                    RETURNS & REFUNDS
                </span>
                <span>
                    To keep quality high and prices low, we have following policy;
                </span>
                <span className='text-lg font-bold ml-2'>
                    We Accept Returns For:
                </span>
                <span>
                    Damaged,DEfective or Wrong Item Received.
                </span>
                <span className='text-lg font-bold ml-2'>
                    We DO NOT Accept
                </span>
                <span>
                    Change of mind, wrong size selection, or late requests.
                </span>
                <span className='text-lg font-bold ml-2'>
                    How to Return
                </span>
                <span>
                    Email us within 7 days of delivery at
                    <a href='mailto:alluremensfashion@gmail.com'>
                        alluremensfashion@gmail.com
                    </a>
                    with order number + photos of the issue.
                </span>
                <span className='text-lg font-bold ml-2'>
                    Refunds
                </span>
                <span>
                    Approved refunds will be issued to the original payment method within 7-10 business days after we receivve the returned item.
                </span>
                <span className='font-bold ml-2'>
                    Note: Due to dropshipping, return shipping costs may be higher than the item value. In such cases, we recommend an exchange or store credit.
                </span>
                <span className='text-lg font-bold ml-2'>
                    Damaged Item
                </span>
                <span>
                    Please take photos of the package and item within 48 hours of delivery.
                </span>
            </div>
            <Footer />
        </div>
    )
}

export default page
