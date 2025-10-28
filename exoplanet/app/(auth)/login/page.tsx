"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Bg from "../../components/bg/bg";
import MetaMaskLogo from "../../components/UI/logo";
import Wordies from "@/app/components/UI/wordies";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (error) {
      setShowError(true);
      timeoutId = setTimeout(() => {
        setShowError(false);
      }, 3000); // 5 seconds
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error]);

  const errorMessages = {
    401: [
      "Invalid Credentials",
      "Uhuh, that's not right",
      "Nope, try again!",
      "Try Again! Lad",
      "Access denied!",
      "Kindly Recheck Details",
      ":("
    ],
    404: ["Service not found", "Can't reach the server"],
    500: ["Server error, please try again later"],
    default: ["Something went wrong, please try again"]
  };

  const getRandomErrorMessage = (statusCode: number) => {
    const messages = errorMessages[statusCode as keyof typeof errorMessages] || errorMessages.default;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Use 401 as default status for authentication errors if not specified
        const statusCode = response.status || 401;
        const errorMessage = getRandomErrorMessage(statusCode);
        throw new Error(errorMessage);
      }
      console.log("Logged in:", data);
      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lg:flex-row lg:flex flex flex-col h-screen lg:my-0 my-30 items-center justify-center xl:mx-0 lg:mx-20">
      <Bg />
      
      <div className="flex-1 flex-col md:mt-0 m-10 items-center flex justify-center space-y-10">
        <div className="hidden md:flex w-70 h-70 backdrop-blur-lg border-2 shadow-inner shadow-purple-200 border-purple-500 rounded-4xl items-center justify-center ">
          <div>
            <MetaMaskLogo />
          </div>
        </div>
            <Wordies />
        </div>
      <div className="flex-1">
        <main className="p-10 w-auto md:w-130 xl:w-140 lg:w-100 rounded-3xl border-2 md:mt-0 mt-10 hover:border-purple-700 border-purple-400 hover:shadow-md cursor-default hover:shadow-purple-500 shadow-gray-500 backdrop-filter backdrop-blur-xl shadow-md transition-all duration-500">
          <h1 className="font-serif text-5xl pb-10 text-start">Login</h1>
          <form className="flex flex-col space-y-8" onSubmit={onSubmit} noValidate>

            {error && (
                <div>
                    <p className={`text-red-600 transition-all duration-300 absolute bg-white p-5 rounded-3xl -translate-x-77 border-2 border-gray-600 ${showError ? 'opacity-100' : 'opacity-0'}`}> 
                        <span className="border-2 border-purple-600 bg-white absolute w-5 h-5 -translate-x-7.5 rotate-45"></span>{error}</p>
                </div>
            )}
            <div className="p-5 rounded-4xl bg-gray-800 border-gray-900 hover:border-gray-600 hover:shadow-md shadow-sm hover:bg-gray-900 hover:-translate-y-1 shadow-gray-700 hover:shadow-gray-700 border-2 transition-all duration-300 cursor-text">
              <input
                className="w-full outline-none focus:ring-0 font-sans"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="p-5 rounded-4xl bg-gray-800 border-gray-900 hover:border-gray-600 hover:shadow-md shadow-sm hover:bg-gray-900 hover:-translate-y-1 shadow-gray-700 hover:shadow-gray-700 border-2 transition-all duration-300 cursor-text">
              <input
                className="w-full outline-none focus:ring-0 font-sans"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-center space-y-4 flex flex-col items-center justify-center text-lg">
              <Link
                href="/forgot-password"
                className="text-center group text-purple-300 tracking-tighter font-light font-sans hover:text-purple-400 transition-colors duration-300"
              >
                Forgot Password?
                <div className="opacity-0 p-1 cursor-default hover:opacity-0 group-hover:opacity-90 -translate-x-150 -translate-y-110 absolute group-hover:transition-all duration-1000 bg-white border-2 rounded-3xl border-gray-600 ">
                    <p><span className="border-2 border-gray-600 bg-white absolute w-5 h-5 translate-y-12.5 rotate-45 -z-10"></span>
                        Did you forgot your password? well you can count on that button</p>
                </div>
              </Link>
              <div>
                Need an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-300 font-light font-sans tracking-tighter hover:text-purple-400 transition-colors duration-300"
                >
                  Register
                </Link>
              </div>
            </div>
            <button
              className="bg-linear-to-r from-purple-500 to-purple-800 hover:from-purple-600 hover:to-purple-950 hover:transition-all % p-4 rounded-4xl border-purple-800 border-3 cursor-pointer hover:duration-400 hover:shadow-amber-500 transition-all duration-400"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </main> 
      </div>
    </div>
  );
}
