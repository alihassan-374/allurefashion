"use client";

import { useEffect, useState } from "react";
import Viewer from "@/app/components/Three/Viewer";
import "./loadanimation.css"
import Loader from "../Loader";
import { preloadModels } from "@/app/lib/preloadmodels";

export default function Intro({ onFinish }) {
  const [animation, setAnimation] = useState(true);
  const [text, setText] = useState(false);

  useEffect(() => {
    const first = setTimeout(() => {
      setAnimation(false);
      setText(true);
    }, 3000);

    const second = setTimeout(() => {
      onFinish();
    }, 11000);

    return () => {
      clearTimeout(first);
      clearTimeout(second);
    };
  }, [onFinish]);

  useEffect(() => {
          preloadModels();
      }, [])

  return (
    <div className={`h-screen bg-[#121212] flex flex-col justify-start items-center`}>
      {text ? (<div className="h-screen bg-[#121212] flex flex-col justify-start items-center">

      <Viewer
        url="/models/Standing Greeting.fbx"
        type="fbx"
      />
<div className="flex flex-col">
  <span
        className={`typing-text md:text-4xl text-2xl relative bottom-[25vh] font-bold text-[#c8a96a] ${
          text ? "block" : "hidden"
        }`}
      >
      Welcome to AllUre
      </span>
        <span className={`typing-text md:text-2xl text-xl relative bottom-[25vh] font-bold text-[#c8a96a] ${
          text ? "block" : "hidden"
        }`}>The Art Of Attraction.</span>
</div>
      </div>):<Loader/>}
      
      
    </div>
  );
}