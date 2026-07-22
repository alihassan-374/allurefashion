"use client";
import { useState } from "react";
import Loadanimation from "./components/loadanimation/loadanimation";
import HomeContent from "./components/Homecontent";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return introFinished ? (
    <HomeContent />
  ) : (
    <Loadanimation onFinish={() => setIntroFinished(true)} />
  );
}