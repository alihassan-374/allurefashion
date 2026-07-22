"use client";

import { useEffect, useState } from "react";
import Viewer from "@/app/components/Three/Viewer";
import "./loadanimation.css"
import Loader from "../Loader";

export default function Intro({ onFinish }) {
  const [text, setText] = useState(false);

  useEffect(() => {
    const first = setTimeout(() => {
      setText(true);
    }, 3000);

    const second = setTimeout(() => {
      onFinish();
    }, 7000);

    return () => {
      clearTimeout(first);
      clearTimeout(second);
    };
  }, [onFinish]);

  return (
      <div className="h-screen w-screen bg-[#121212] flex flex-col justify-start items-center">
<div className="flex flex-col my-auto justify-center items-center">
  <span
        className={`typing-text md:text-4xl text-2xl relative bottom-[25vh] font-bold text-[#c8a96a] block`}
      >
      Welcome to AllUre
      </span>
        <span className={`typing-text md:text-2xl text-xl relative bottom-[25vh] font-bold text-[#c8a96a] ${
          text ? "block" : "hidden"
        }`}>The Art Of Attraction.</span>
</div>
      </div>
      
  );
}