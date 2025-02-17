import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Logo from "../../public/logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 flex items-center justify-center flex-col z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="bg-[#E8F3EA] w-full flex items-center justify-between  text-sm">
        <div className="container mx-auto flex h-10 items-center justify-between">
          <span>+443574545</span>
          <div className="flex items-center gap-4">
            <span>Get 20% off selected food items</span>
            <Link href="/shop" className="text-[#FF4500] hover:underline">
              Shop Now
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent">
              <option>Eng</option>
            </select>
            <select className="bg-transparent">
              <option>Location</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              className="h-8 w-8"
            />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium">
              Services
            </Link>
            <Link href="/location" className="text-sm font-medium">
              Location
            </Link>
            <Link href="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search food item"
              className="w-[300px] pl-9"
            />
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white">
                5
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
