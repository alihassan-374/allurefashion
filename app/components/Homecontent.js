"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Viewer from "./Three/Viewer";
import { preloadModels } from "@/app/lib/preloadmodels";
import Navbar from "./Navbar";
import Carousel from "./Coursel";
import Footer from "./Footer";

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
            <section className="md:h-[calc(100vh-70px)] h-fit mt-0">
                <div className="flex flex-col md:flex-row mt-[70px]">
                    <div className="text flex flex-col md:mt-2  mt-17.5  md:w-[50vw] w-full md:h-[calc(100vh-50px)] h-fit text-left px-4 justify-center items-center">
                        <div className="Name md:text-8xl text-4xl font-extrabold">
                            AllUre
                        </div>
                        <div className="slogan md:text-4xl text-2xl">
                            The Art Of Attraction.
                        </div>
                        <div className="desc">
                            AllUre is a men's grooming and lifestyle brand that offers a range of products and services to help men look and feel their best. From skincare and haircare to fashion and accessories, AllUre is dedicated to helping men express their unique style and personality. Our mission is to empower men to embrace their individuality and confidence.
                        </div>
                        <div className="button mt-2 flex gap-2">
                            <Link href="/" className="bg-[#c8a96a] rounded-lg active:scale-90  hover:text-md hover:font-bold p-2 mt-2">Explore Products</Link>
                            <Link href="/" className="bg-[#c8a96a] rounded-lg  hover:text-md active:scale-90 hover:font-bold p-2 mt-2">Sign Up Now</Link>
                        </div>
                    </div>
                    <div className="viewer md:w-[50vw] w-full md:h-[calc(100vh-80px)] flex justify-end items-center">
                        <Viewer
                            className="w-full h-[70%] md:h-[90%]"
                            url={`${animation ? "/models/Standing Idle" : "/models/Standing Greeting"}.fbx`}
                            type="fbx"
                            autoRotate={false}
                        />
                    </div>
                </div>

            </section>
            <div className="scroll flex justify-center items-center text-lg font-bold mx-auto p-2 rounded-4xl hover:text-xl cursor-pointer border-2 border-[#121212] w-fit " onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
                <span>Scroll Now!</span><span className="material-symbols-outlined">
                    south
                </span>
            </div>
            <div className="h-0.5 w-full bg-[#c8a96a] mt-4"></div>
            <section className="flex flex-col gap-2 p-2">
                <span className="text-4xl md:text-6xl  mt-8 text-[#121212] font-bold">What's Trending:</span>
                <Carousel />
            </section>
            <section className="h-fit flex flex-col gap-2 p-6 justify-center items-center">
                <div className="text-4xl md:text-6xl  mt-8 text-[#121212] font-bold">
                    Products
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 mt-4">
                    <div className="grid  bg-[#c8a96a] border-2 border-[#121212] rounded-lg mt-4  grid-cols-1  gap-4 w-full">
                        <div className="text flex flex-col gap-2 p-4">
                            <div className="text-2xl md:text-3xl font-bold">
                                Apparel
                            </div>
                            <div className="text-lg md:text-lg">
                                Our apparel collection is designed to help men express their unique style and personality. From casual wear to formal attire, we offer a range of clothing options that are both stylish and comfortable. Our apparel is made from high-quality materials and is designed to fit men of all shapes and sizes.
                            </div>
                            <div className="arrow text-2xl md:text-4xl font-bold flex gap-2 items-center cursor-pointer hover:text-[#f8f6f2]">
                                <a href="/Apparel">
                                    <span className="material-symbols-outlined">
                                        arrow_right_alt
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="Animation bg-[#f8f6f2]">
                            <Viewer
                                url="/models/dress.glb"
                                type="glb"
                                autoRotate={true}
                            />
                        </div>
                    </div>
                    <div className="grid  bg-[#c8a96a] border-2 border-[#121212] rounded-lg mt-4  grid-cols-1  gap-4 w-full">
                        <div className="text flex flex-col gap-2 p-4">
                            <div className="text-2xl md:text-3xl font-bold">
                                Accesories
                            </div>
                            <div className="text-lg md:text-lg">
                                Our accessories collection is designed to help men express their unique style and personality. From watches to belts, we offer a range of accessories options that are both stylish and functional. Our accessories are made from high-quality materials and is designed to fit men of all shapes and sizes.
                            </div>
                            <div className="arrow text-2xl md:text-4xl font-bold flex gap-2 items-center cursor-pointer hover:text-[#f8f6f2]">
                                <a href="/Accesories">
                                    <span className="material-symbols-outlined">
                                        arrow_right_alt
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="Animation bg-[#f8f6f2]">
                            <Viewer
                                url="/models/accesories.glb"
                                type="glb"
                                autoRotate={true}
                            />
                        </div>
                    </div>
                    <div className="grid  bg-[#c8a96a] border-2 border-[#121212] rounded-lg mt-4  grid-cols-1  gap-4 w-full">
                        <div className="text flex flex-col gap-2 p-4">
                            <div className="text-2xl md:text-3xl font-bold">
                                Grooming
                            </div>
                            <div className="text-lg md:text-lg">
                                Our grooming collection is designed to help men express their unique style and personality. From skincare to haircare, we offer a range of products that are both effective and easy to use. Our grooming products are made from high-quality materials and are designed to fit men of all shapes and sizes.
                            </div>
                            <div className="arrow text-2xl md:text-4xl font-bold flex gap-2 items-center cursor-pointer hover:text-[#f8f6f2]">
                                <a href="/Grooming">
                                    <span className="material-symbols-outlined">
                                        arrow_right_alt
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div className="Animation bg-[#f8f6f2]">
                            <Viewer
                                url="/models/beauty.glb"
                                type="glb"
                                autoRotate={true}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default HomeContent
