"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Bg from "../../components/bg/bg";

export default function RegisterPage() {

    const router = useRouter();
    const[firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = React.useState("");
    
    const fullName = `${firstname} ${lastname}`.trim();
    async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  console.log("Submitting:", { firstname, lastname, email, password });

  try {
    const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: fullName, email, password})
    })
    const data = await response.json();

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Something went wrong");
    }

    console.log("Registered! :", data);
    alert("Registration successful!");
    router.push('/login');

  } catch (err: any) {
    console.error("Error:", err.message);
    setError(err.message);
  }
}

    return (
        <div className="flex items-center justify-center h-screen">
            <Bg/>
            <form onSubmit={onSubmit} className="w-120 flex flex-col space-y-6 justify-center">
                <h1 className="font-sans text-5xl text-center underline decoration-gray-600 decoration-dotted underline-offset-14 pb-6"><span className="font-serif italic text-purple-500">Register</span> Page</h1>
                <div className="grid grid-rows-1 grid-cols-2 gap-x-4">
                <div className="p-5 rounded-4xl bg-gray-800 border-gray-900 hover:border-gray-600 hover:shadow-md shadow-sm hover:bg-gray-900 hover:-translate-y-1 shadow-gray-700 hover:shadow-gray-700 border-2 transition-all duration-300 cursor-text">
                    <input type="text" className="w-full outline-none focus:ring-0 font-sans"  onChange={(e) => setFirstName(e.target.value)} required placeholder="First name" />
                </div>
                <div className="p-5 rounded-4xl bg-gray-800 border-gray-900 hover:border-gray-600 hover:shadow-md shadow-sm hover:bg-gray-900 hover:-translate-y-1 shadow-gray-700 hover:shadow-gray-700 border-2 transition-all duration-300 cursor-text">
                    <input type="text" className="w-full outline-none focus:ring-0 font-sans"  onChange={(e) => setLastName(e.target.value)} required  placeholder="Last name" />
                </div>
                </div>
                <div className="p-5 rounded-4xl bg-gray-800 border-gray-900 hover:border-gray-600 hover:shadow-md shadow-sm hover:bg-gray-900 hover:-translate-y-1 shadow-gray-700 hover:shadow-gray-700 border-2 transition-all duration-300 cursor-text">     
                    <input className="w-full outline-none focus:ring-0 font-sans" type="email" onChange={(e) => setEmail(e.target.value)} required placeholder="Email" />
                </div>
                <div className="p-5 rounded-4xl bg-gray-800 border-gray-900 hover:border-gray-600 hover:shadow-md shadow-sm hover:bg-gray-900 hover:-translate-y-1 shadow-gray-700 hover:shadow-gray-700 border-2 transition-all duration-300 cursor-text">
                    <input className="w-full outline-none focus:ring-0 font-sans" type="password" onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
                </div>
                <div>
                {error && (<div className="p-4 text-red-500 rounded-lg">{error}</div>)}
                <p>already have account? 
                    <Link href="/login" className="text-purple-500 hover:text-purple-700 underline decoration-dotted">Login</Link>
                </p>
            </div>
                <button className="bg-linear-to-r from-purple-500 to-purple-800 hover:from-purple-600 hover:to-purple-950 hover:transition-all % p-4 rounded-4xl border-purple-800 border-3 cursor-pointer hover:duration-400 hover:shadow-amber-500 transition-all duration-400" type="submit">Register</button>
            </form>
        </div>
    )
}