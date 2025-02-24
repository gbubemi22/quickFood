"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import login from "../../../../public/placeholder.jpg";
export default function LoginPage() {
  return (
    <div className=" h-[90%] rounded-xl w-full flex items-center max-w-screen-2xl mx-auto justify-center font-inter bg-[#1B3726]">
      <div className=" flex w-full gap-16  justify-center h-full items-center">
        <div className=" hidden lg:block lg:w-1/2 relative h-[90%]  rounded-lg overflow-hidden">
          <Image
            src={login}
            alt="Login"
            fill
            objectFit="cover"
            className="rounded-lg h-full w-1/2"
          />
        </div>
        <div className=" w-1/2  max-w-[480px] space-y-6">
          <div className="space-y-8 text-white">
            <h1 className="text-6xl font-semibold tracking-tight">Login</h1>
            <p className="text-zinc-100">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#FF4500] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-white">Email or Username</label>
              <div className="relative">
                <Input
                  placeholder="Firstname"
                  className="h-12 bg-white pl-12"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
                >
                  <path d="M21 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-zinc-100 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-12 bg-white pl-12"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>
            <Button className="h-12 w-full bg-[#FF4500] text-base font-semibold hover:bg-[#FF4500]/90">
              LOGIN
            </Button>
            <Button
              variant="outline"
              className="h-12 w-full bg-white text-base font-semibold"
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Login with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
