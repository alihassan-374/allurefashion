"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

function AdminLogin() {
  const [visibilityword, setvisibilityword] = useState("visibility_off");
  const [adminname, setadminname] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();

  const changevisibility = () => {
    setvisibilityword((prev) => (prev === "visibility" ? "visibility_off" : "visibility"));
  };

  async function handlelogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminname, password }),
      });

      const result = await response.json();
      if (result.success) {
        router.push("/admin/manage");
      } else {
        seterror(result.message);
      }
    } catch (err) {
      seterror("Something went wrong. Try again!");
    }
  }

  return (
    <div className="bg-[#f8f6f2] min-h-screen flex flex-col ">
        <Navbar/>
      <h1 className="text-2xl font-bold">Admin Panel Login</h1>
      <form onSubmit={handlelogin} className="md:w-[50vw] mx-auto w-[90vw] p-6 my-auto border-2 border-[#121212] rounded-2xl flex flex-col items-center justify-center">
        <div className="flex h-fit my-auto flex-col gap-2 w-[90vw] md:w-[50vw] ">
          <label className="font-bold text-2xl mx-2" htmlFor="adminname">Admin Name:</label>
          <input
            type="text"
            value={adminname}
            onChange={(e) => {
              setadminname(e.target.value);
              seterror("");
            }}
            className="bg-white rounded-lg border-2 border-[#121212] mx-2 py-2 w-[90%] px-1 text-black"
            placeholder="Enter Admin Name"
          />
        </div>
        <div className="flex h-fit my-auto flex-col gap-2 w-[90vw] md:w-[50vw] ">
          <label className="font-bold text-2xl mx-2" htmlFor="password">Password:</label>
          <div className="w-full flex justify-center items-center gap-2">
            <input
              type={visibilityword === "visibility" ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
                seterror("");
              }}
              className="bg-white rounded-lg border-2 border-[#121212] mx-2 py-2 w-[90%] px-1 text-black"
              placeholder="Enter Your Password"
            />
            <span
              onClick={changevisibility}
              className="material-symbols-outlined relative text-black active:scale-95 bg-white rounded-full p-1 cursor-pointer"
            >
              {visibilityword}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#c8a96a] rounded-lg  hover:text-md hover:font-bold p-2 mt-2"        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {error}
    </div>
  );
}

export default AdminLogin;
