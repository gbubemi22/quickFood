"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Minus } from "lucide-react";
    import { SiteHeader } from "@/components/site-header";

const FoodOrderUI = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get price dynamically from FoodItemCard.tsx
  const basePrice = parseFloat(searchParams.get("price")) || 0;

  const [extras, setExtras] = useState([
    { name: "Beef", quantity: 1, price: 50, category: "protein", image: "/beef.png" },
    { name: "Fish", quantity: 0, price: 70, category: "protein", image: "/fish.png" },
    { name: "Water", quantity: 1, price: 10, category: "drink", image: "/water.png" },
    { name: "Cola", quantity: 0, price: 20, category: "drink", image: "/cola.png" },
  ]);

  const handleIncrement = (name: string) => {
    setExtras((prevExtras) =>
      prevExtras.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (name: string) => {
    setExtras((prevExtras) =>
      prevExtras.map((item) =>
        item.name === name && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    const extrasTotal = extras.reduce((sum, item) => sum + item.quantity * item.price, 0);
    return basePrice + extrasTotal;
  };

  const handleAddToCart = () => {
    const selectedItems = extras.filter((item) => item.quantity > 0);

    const cartItem = {
      baseItem: "Fried Rice & Chicken",
      basePrice,
      extras: selectedItems,
      total: calculateTotal(),
    };

    // Ensure existing cart is an array
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!Array.isArray(existingCart)) {
      localStorage.setItem("cart", JSON.stringify([cartItem]));
    } else {
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
    }

    console.log("Navigating to cart..."); // Debugging
    router.push("/cart"); // Ensure this route exists
  };

  const proteins = extras.filter((item) => item.category === "protein");
  const drinks = extras.filter((item) => item.category === "drink");

  const renderExtras = (title: string, items: any[]) =>
    items.length > 0 && (
      <>
        <h4 className="mt-4 font-semibold">{title}</h4>
        <div className="mt-2 space-y-2">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center bg-transparent p-4 border border-[#C6E3E5] rounded-[20px]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded-lg object-cover p-1"
              />

              <span className="flex w-2/3 gap-5">
                <span className="w-20 font-medium">{item.name}</span>
                <span className="w-8 font-medium"> x </span>
                <span className="w-8 text-gray-600">{item.quantity}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecrement(item.name)}
                  className="p-1 border rounded"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={() => handleIncrement(item.name)}
                  className="p-1 border rounded"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );

  return (
    <div>
      <SiteHeader />
      <div className="bg-white w-[90%] md:w-[80%] h-auto mx-auto p-6">
        <div className="flex flex-col md:flex-row border border-[#C6E3E5] gap-6 mt-6 bg-transparent p-6 rounded-lg shadow-md">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="/food.png"
              alt="Fried Rice & Chicken"
              className="w-full rounded-lg object-cover"
            />
            <div className="mt-4 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold">
                Fried Rice & Chicken
              </h2>
              <p className="text-gray-600 text-sm my-2">
                A plate of Jollof Rice with Assorted Meat and Fish, prepared
                with unique Nigerian spices and seasoning.
              </p>
               {/* Restaurant Info */}
               <div className="flex flex-col md:flex-row items-center gap-4">
                <img
                  src="/restaurant.png"
                  alt="Restaurant"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-green-700 font-medium">
                  Open Sea Restaurant
                </span>
              </div>

              {/* Info Icons */}
              <div className="grid grid-cols-3 md:flex items-center justify-center gap-6 md:gap-10 mt-6">
                <div className="flex flex-col items-center border-r md:pr-6">
                  <img
                    src="/clock.png"
                    alt="Clock"
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                  <span className="text-green-600 font-medium">25 min</span>
                  <p className="text-green-600 text-sm">Delivery</p>
                </div>
                <div className="flex flex-col items-center border-r md:pr-6">
                  <img
                    src="/location.png"
                    alt="Location"
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                  <span className="text-green-600 font-medium">Birmingham</span>
                  <p className="text-green-600 text-sm">Location</p>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="/ratings.png"
                    alt="Rating"
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                  <span className="text-green-600 font-medium">4.5</span>
                  <p className="text-green-600 text-sm">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="w-full md:w-[40%] mt-6 p-4 border rounded-lg">
            <h3 className="text-lg font-bold">Add Extras</h3>

            {/* Dynamic Proteins & Drinks */}
            {renderExtras("Proteins", proteins)}
            {renderExtras("Drinks", drinks)}

            {/* Special Request */}
            <div className="mt-4">
              <h4 className="font-semibold">Special Request (optional)</h4>
              <textarea
                className="w-full p-2 border rounded mt-2 text-sm"
                placeholder="Please make sure it's extra spicy"
              ></textarea>
            </div>

            {/* Total and CTA */}
            <div className="mt-6 text-left">
              <p className="text-lg font-semibold">Total: ₦{calculateTotal().toFixed(2)}</p>
              <button
                className="w-full bg-[#006634] text-white py-2 rounded-md mt-2"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodOrderUI;
