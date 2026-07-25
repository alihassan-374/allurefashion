"use client"
import { useState, useEffect } from "react";
import { preloadModels } from "@/app/lib/preloadmodels";
import Navbar from "./Navbar";
import Carousel from "./Coursel";
import Footer from "./Footer";
import Link from "next/link";

function HomeContent() {

  const [animation, setanimation] = useState(true)
  useEffect(() => {
    preloadModels();
  }, [])

  useEffect(() => {
    let timeout;
    if (animation) {
      timeout = setTimeout(() => {
        setanimation(false);
      }, 4000); // 5 seconds
    }
    return () => clearTimeout(timeout);
  }, [animation]);

  return (
    <div>
      <Navbar />
      <section className="min-h-[calc(100vh-70px)]">
        <div
          className="
      min-h-[calc(100vh-70px)]
      md:bg-[url('/bg.png')]
      bg-[url('/bgmobile.png')]
      bg-no-repeat
      bg-cover
      bg-[center_bottom]

      md:bg-center

      flex
      flex-col
      justify-start
      md:justify-center

      px-6
      sm:px-10
      lg:px-20

      pt-16
      sm:pt-20
      md:pt-0
    "
        >
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold">
              AllUre
            </h1>

            <h2 className="garamond text-2xl sm:text-3xl lg:text-4xl mt-2">
              The Art Of Attraction.
            </h2>

            <p className="mt-6 max-w-xl text-sm sm:text-base lg:text-lg leading-7">
              AllUre is a men's grooming and lifestyle brand that offers a range of
              products and services to help men look and feel their best. From
              skincare and haircare to fashion and accessories, AllUre is dedicated
              to helping men express their unique style and personality. Our mission
              is to empower men to embrace their individuality and confidence.
            </p>


            <div className="mt-8 flex flex-col sm:flex-row gap-2">
              <Link
                href="#product"
                className="bg-[#c8a96a] rounded-lg p-3 text-center transition active:scale-95 hover:font-bold"
              >
                Explore Products
              </Link>

              <Link
                href="/signup"
                className="bg-[#c8a96a] rounded-lg p-3 text-center transition active:scale-95 hover:font-bold"
              >
                Sign Up Now
              </Link>
            </div>

            <div
              className="mt-2 flex w-fit items-center gap-2 rounded-full border-2 border-[#121212] px-5 py-2 cursor-pointer"
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
            >
              <span>Scroll Now!</span>
              <span className="material-symbols-outlined">south</span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-0.5 w-full bg-[#c8a96a] mt-4"></div>
      <section className="flex flex-col gap-2 p-2">
        <span className="text-4xl md:text-6xl  mt-8 text-[#121212] font-bold garamond">What's Trending:</span>
        <Carousel />
      </section>
      <section id="product" className="h-fit flex flex-col gap-2 p-6 justify-center items-center">
        <div className="text-4xl garamond md:text-6xl  mt-8 text-[#121212] font-bold">
          Products
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full">

          <div className="flex flex-col">
            <Link href="/Accessories" className=" rounded-lg border border-[#121212] flex flex-col justify-center items-center gap-2 hover:scale-105 transition-transform duration-300">
              <img src="/Apparel (1).png" alt="Apparel" className="w-full h-full object-cover rounded-lg hover:scale-100 transition-transform duration-300" />
              <span className="w-full text-lg font-bold text-[#121212] flex justify-center items-center hover:scale-105 transition-transform duration-300">
                Visit Now <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
              </span>
            </Link>
          </div>
          <div className="flex flex-col">
            <Link href="/Apparel" className=" rounded-lg border border-[#121212] flex flex-col justify-center items-center gap-2 hover:scale-105 transition-transform duration-300">
              <img src="/Apparel.png" alt="Apparel" className="w-full h-full object-cover rounded-lg hover:scale-100 transition-transform duration-300" />
              <span className="w-full text-lg font-bold text-[#121212] flex justify-center items-center hover:scale-105 transition-transform duration-300">
                Visit Now <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
              </span>
            </Link>
          </div>
          <div className="flex flex-col">
            <Link href="/Grooming" className=" rounded-lg border border-[#121212] flex flex-col justify-center items-center gap-2 hover:scale-105 transition-transform duration-300">
              <img src="/Apparel (2).png" alt="Apparel" className="w-full h-full object-cover rounded-lg hover:scale-100 transition-transform duration-300" />
              <span className="w-full text-lg font-bold text-[#121212] flex justify-center items-center hover:scale-105 transition-transform duration-300">
                Visit Now <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default HomeContent
