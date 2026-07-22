import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function page() {
  return (
    <div className='bg-[#f8f6f2] text-[#121212]'>
        <Navbar/>
        <div className='min-h-[calc(100vh-70px)] p-2 flex flex-col gap-1 '>
        <span className='text-4xl md:text-6xl mx-auto  mt-8 text-[#121212] font-bold'>
            About Us:
        </span>
        <span className="text-2xl font-bold">
            Curated for You.Crafted with CAre.
        </span>
        <span>
        At <span className='font-bold'>AllUre</span>, we believe style is more than what youwear. It's how you feel.
        </span>
        <span>
          We started AllUre with one simple goal: to bring you premium, thoughtfully curated pieces without the hassle, without the compromise.
        </span>
        <span className='text-2xl font-bold'>
        Why We're Different
        </span>
        <span>
          We're not a big warehouse. We're not mass-producing.
        </span>
        <span className='font-bold ml-2'>
        AllUre works directly with trusted manufacturers and artisans worldwide 
        </span>
        <span>
          to source pieces that meet our standards for quality,design, and finish.
        </span>
        <span>
          Every product see on our site is handpicked by our team. If it does not pass our quality check,it dosenot make it to you.
        </span>
        <span>
          Because you deserve better than "just another order."
        </span>
        <span className='text-2xl font-bold'>
        Our Promise to You
        </span>
        <span className='text-lg font-bold ml-2'>
        1.We're Careful With You
        </span>
        <span>
          From the moment you land on our site to the moment your package arrives, we treat your experiece like it matters - because it does.
        </span>
        <span>
          Your data is secure. Your order is tracked. You're questions are answered by real humans at alluremensfashion@gmail.com
        </span>
        <span className='text-lg font-bold ml-2'>
        We're Transparent With You
        </span>
        <span>
          We're a curated brand that partners with premium suppliers globally. This lets us bring you luxury designs at fair prices.
        </span>
        <span className='font-bold'>
        Your order is made-to-order and shipped directly from our trusted partners to ensure freshness and quality.
        </span>
        <span>
          No hidden fees. No false promises. Just clear timelines and honest communication.
        </span>
        <span className='text-lg font-bold ml-2'>
        3.We're Obsessed With Quality
        </span>
        <span>
          Details matter. we check all. If something isn't right, we'll make it right. Becasue your trust is worth more than one sale.
        </span>
        <span className='text-lg font-bold ml-2'>
        Our Mission
        </span>
        <span>
        To make luxury accessible.         
         </span>
         <span>
          To make shopping stress-free.
         </span>
         <span>
          To make you fell confident, every single time you wear AllUre.
         </span>
         <span>
          We're small, but we care big.
         </span>
         <span>
          Thank you for being part of the AllUre family.
         </span>
         <span className='text-lg font-bold ml-2'>
          With care,
         </span>
         <span className="text-lg font-bold ml-2">
          Founder : Ali Hassan & Co-Founder:Salman
         </span>
         <span className='text-lg font-bold ml-2'>
          And Our Sincere Team.
         </span>
        </div>
      <Footer/>
    </div>
  )
}

export default page
