"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import login from "../../../../public/login.png";
import Google from "../../../../public/ic_google.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }

      // Store token and redirect
      localStorage.setItem("token", data.token);
      router.push("/restaurants"); // Ensure the correct route is used
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[90%] rounded-xl w-full flex items-center max-w-screen-2xl mx-auto justify-center font-inter bg-[#1B3726]">
      <div className="flex w-full gap-16 justify-center h-full items-center">
        <div className="hidden lg:block lg:w-1/2 relative h-[90%] rounded-lg overflow-hidden">
          <Image src={login} alt="Login" fill objectFit="cover" className="rounded-lg h-full w-1/2" />
        </div>
        <div className="w-1/2 max-w-[480px] space-y-6">
          <div className="space-y-8 text-white">
            <h1 className="text-6xl font-semibold tracking-tight">Login</h1>
            <p className="text-zinc-100">
              Don&apos;t have an account? {" "}
              <Link href="/signup" className="text-[#FF4500] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="space-y-2">
              <label className="text-sm text-white">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-white pl-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Password</label>
                <Link href="/forgotPassword" className="text-sm text-zinc-100 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-12 bg-white pl-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              className="h-12 w-full bg-[#FF4500] text-base font-semibold hover:bg-[#FF4500]/90"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </Button>
            <Button variant="outline" className="h-12 w-full bg-white text-base font-semibold">
              <Image src={Google} alt="Google" width={20} height={20} className="mr-2" />
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
