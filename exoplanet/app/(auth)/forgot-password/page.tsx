"use client";
import React, {useState} from "react";
import Link from "next/link";
import Bg from "../../components/bg/bg";

export default function Page() {
    const[email, setEmail] = useState("");
    const[message, setMessage] = useState("")
    const[error, setError]=useState("")
    const[loading, setLoading]=useState(false);

    async function handleSubmit (e: React.FormEvent){
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try{
            const res = await fetch("http://127.0.0.1:8000/forgot-password",{
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({email}),
            });
        
            const data = await res.json();

            if (!res.ok){
                throw new Error(data.detail || "Something went unexpected")
            }

            setMessage(data.message);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
            
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <Bg/>
            
            <form onSubmit={handleSubmit} className="flex flex-col space-y-8 p-20 rounded-4xl">
            <h1 className="text-5xl pb-8 underline decoration-gray-600 decoration-dotted underline-offset-14 text-center font-sans">
                <span className="italic text-purple-500 font-serif">Forgot </span>
                Password
            </h1>
                <div className="p-5 text-lg rounded-4xl w-100 xl:w-120 bg-gray-800 border-gray-900 hover:border-gray-600 hover:shadow-md shadow-sm hover:bg-gray-900 hover:-translate-y-1 shadow-gray-700 hover:shadow-gray-700 border-2 transition-all duration-300 cursor-text">
                    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} required value={email} type="email"
                     className="w-full outline-none focus:ring-0 font-sans"></input>
                </div>
                <div className="text-center">
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-400">{message}</p>}
                </div>
                <div className="flex flex-col space-y-3 pb-5 text-center">
                    <div className="text-lg">Don't have an account?
                        <Link href="/register" className="font-light text-xl font-sans text-purple-500 hover:text-purple-400 transition-all duration-300"> Register</Link>
                    </div>
                    <Link href="/login" className="text-2xl font-light font-sans text-purple-500 hover:text-purple-400 transition-all duration-300"> ← Login</Link>
                </div>
                <button
                className="cursor-pointer bg-linear-to-r text-xl from-purple-800 transition-all hover:duration-600 hover:-translate-y-1 duration-300 to-sky-800 hover:from-sky-800 hover:to-purple-800 shadow-purple-800 shadow-sm p-5 rounded-full hover:shadow-md border-purple-950 border-3"
                type="submit" disabled={loading}>{loading ? "Sending" : "Send Reset Link"}</button>
            </form>
        </div>
    )
}
