"use client"
import Navbar from '@/app/components/Navbar'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Footer from '@/app/components/Footer'
function page() {
  const params = useParams();
  const productId = params.id;
  const [current, setCurrent] = useState(0);
  const [product, setproduct] = useState({});
  const [error, seterror] = useState("");
  const length = 3;
  const router = useRouter();
  const { data: session, status } = useSession();
  const [fav, setfav] = useState(true);
  useEffect(() => {
    let findproduct = async (Id) => {
      try {
        const res = await fetch(`/api/admin/product/getone?Id=${Id}`)
        let data = await res.json()
        console.log(data)
        if (data.success) {
          setproduct(data.product)
          seterror("")
        } else {
          seterror("Product Not Fuound")
        }
      } catch (error) {
        seterror("Internal Server Error!If you are facing several errors please contact alluremensfashion@gamil.com.")
        console.log(error)
      }
    }
    findproduct(productId)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  async function addfavourite() {
    try {
      if (status === "authenticated") {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          email: session.user.email,
          productId: product._id
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        const res = await fetch("/api/user/favourite/add", requestOptions);
        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          setfav(true)
        } else if(data.message ==="Already Exixts in Favourites!") {
          toast.info(data.message)
          setfav(true)
        }
      } else {
        router.push("/singup")
      }
    } catch (error) {
      toast.error("Internal Server! If you are facing several errors please contact alluremensfashion@gmail.com")
      console.log(error)
    }
  }
  async function deletefavourite() {
try {
      if (status === "authenticated") {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          email: session.user.email,
          productId: product._id
        });
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        const res = await fetch("/api/user/favourite/delete", requestOptions);
        const data = await res.json();
        if (data.success) {
          toast.success(data.message);
          setfav(false)
        } else {
          toast.error(data.message)
        }
      } else {
        router.push("/singup")
      }
    } catch (error) {
      toast.error("Internal Server! If you are facing several errors please contact alluremensfashion@gmail.com")
    }
  }
  function handleclikc() {
    if(fav){
      deletefavourite()
    }else{
addfavourite()
    }
  }

  return (
    <div className='bg-[#f8f6f2] flex flex-col justify-between h-screen'>
      <Navbar />
      <div className='min-h-[calc(100vh-70px)] flex  flex-col mt-8 justify-center  items-end py-10'>
        {error ? (<div>{error}</div>) : (
          <div className='flex flex-col mx-auto my-auto h-fit p-4  w-[90vw] gap-10 border-2 border-[#121212]'>
            <div className="relative w-[80vw] mx-auto mt-4 h-[40vh] md:h-[40vh] overflow-hidden rounded-xl  bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
              {/* Images */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >

                <div className="shrink-0 w-full h-[40vh] relative">
                  <Image
                    src={product.mainimg || "/AllUre.png"}
                    alt={`Slide main`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="shrink-0 w-full h-[40vh] relative">
                  <Image
                    src={product.secondimg || "/AllUre.png"}
                    alt={`Slide second`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="shrink-0 w-full h-[40vh] relative">
                  <Image
                    src={product.thirdimg || "/AllUre.png"}
                    alt={`Slide third`}
                    fill
                    className="object-contain"
                  />
                </div>

              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition active:scale-95"
              >
                ❮
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition active:scale-95"
              >
                ❯
              </button>

              {/* Dots */}

            </div>
            <div className='flex  justify-between gap-2 flex-col'>
              <div className='flex flex-col'>
                <span className='title text-2xl font-bold'>
                  {product.title}
                </span>
                <span className='text-lg'>
                  {product.desc}
                </span>
              </div>
              <div className='flex gap-2 justify-center items-center'>
                <a className='bg-[#c8a96a] rounded-lg  hover:text-md active:scale-90 hover:font-bold p-2 mt-2' href={`/Apparel/${product._id}/order`}>
                  Buy Now </a>
                <span onClick={()=>handleclikc()} className="material-symbols-outlined cursor-pointer active:scale-95">
                  {fav? "check":"favorite"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer/>
      <ToastContainer />
    </div>
  )
}

export default page
