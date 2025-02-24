import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  Receipt,
  FileText,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type React from "react"; // Import React

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarMenu({ className }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-screen w-[240px] flex-col border-r bg-white",
        className
      )}
    >
      <div className="p-6">
        <Image
          src="/public/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="h-10 w-10"
        />
      </div>
      <div className="flex-1 space-y-1 px-3">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/orders">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Button>
        </Link>
        <Link href="/dashboard/transactions">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Receipt className="h-5 w-5" />
            Transactions
          </Button>
        </Link>
        <Link href="/dashboard/invoice">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <FileText className="h-5 w-5" />
            Invoice
          </Button>
        </Link>
        <Link href="/dashboard/tracking">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <MapPin className="h-5 w-5" />
            Tracking
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </Link>
        <Link href="/dashboard/support">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <HelpCircle className="h-5 w-5" />
            Support
          </Button>
        </Link>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 px-2 py-3">
          <Image
            src="/placeholder.svg"
            alt="User"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium">Tobi Makinde</p>
            <p className="text-sm text-gray-500">Customer</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
