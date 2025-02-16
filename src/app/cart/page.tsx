"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/Page Components/Restaurant Page Components/cartContext";

import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart(); // Get cart functions from context
  const router = useRouter(); // Initialize router

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price + item.extrasPrice) * item.quantity,
    0
  );
  const tax = 2;
  const delivery = 0;
  const total = subtotal + tax + delivery;

  return (
    <div>
      <SiteHeader />
      <div className="max-w-5xl mx-auto p-6 bg-white text-[#4E5458]">
        <h2 className="text-xl font-bold mb-4">My Cart</h2>
        <div className="flex gap-6">
          {/* Cart Items Section */}
          <div className="flex-1 bg-white shadow-sm p-4 rounded-lg">
            <div className="grid grid-cols-5 text-gray-500 font-medium pb-2 border-b">
              <p className="col-span-2">Item Description</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Action</p>
            </div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-5 items-center py-4 border-b"
              >
                {/* Item Details */}
                <div className="flex gap-4 col-span-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={30}
                    height={25}
                    className="rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.restaurant}</p>
                  </div>
                </div>
                {/* Price */}
                <p className="text-green-600 font-medium">
                  ${(item.price + item.extrasPrice).toFixed(2)}
                </p>
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </Button>
                  <p>{item.quantity}</p>
                  <Button
                    variant="outline"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </Button>
                </div>
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="w-1/3 bg-white shadow-sm p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} className="mb-2">
                <p className="font-medium">{item.name}</p>
                {item.extras.map((extra, index) => (
                  <p key={index} className="text-sm text-gray-500">
                    • {extra}
                  </p>
                ))}
                <p className="text-right font-medium">
                  ${(item.price + item.extrasPrice).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="border-t mt-4 pt-4">
              <p className="flex justify-between text-sm">
                <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span>Est Tax</span> <span>${tax.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span>Delivery</span>{" "}
                <span>{delivery === 0 ? "Free" : `$${delivery.toFixed(2)}`}</span>
              </p>
              <p className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span> <span>${total.toFixed(2)}</span>
              </p>
            </div>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg"
              onClick={() => router.push("/cart/delivery")}
            >
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}