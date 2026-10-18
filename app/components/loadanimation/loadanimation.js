"use client";

import { useEffect, useState } from "react";
import "./loadanimation.css";

export default function Intro({ onFinish }) {
  const [showTagline, setShowTagline] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const taglineTimer = setTimeout(() => {
      setShowTagline(true);
    }, 1800);

    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 5500);

    const finishTimer = setTimeout(() => {
      onFinish?.();
    }, 6200);

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <main
      className={`intro-screen ${exiting ? "intro-exit" : ""}`}
    >
      <div className="intro-content">
        <span className="intro-label">WELCOME TO</span>

        <h1 className="intro-title">
          All<span>Ure</span>
        </h1>

        <div className="intro-line" />

        <p
          className={`intro-tagline ${
            showTagline ? "tagline-visible" : ""
          }`}
        >
          The Art Of Attraction.
        </p>
      </div>
    </main>
  );
}