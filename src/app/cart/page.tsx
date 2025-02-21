"use client";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
// import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  baseItem: string; // Name of main meal
  basePrice: number; // Price of the base meal
  extras: {
    name: string;
    quantity: number;
    price: number;
    category: string;
    image: string;
  }[];
  total: number; // Total price of base + extras
  quantity: number; // Added quantity field
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart) || [];
        // Assign an id if missing
        const updatedCart = parsedCart.map((item: any, index: number) => ({
          id: index + 1,
          quantity: item.quantity || 1,
          ...item,
        }));
        setCart(updatedCart);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCart([]);
      }
    }
  }, []);

  // Increase quantity
  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1, total: item.total + item.basePrice } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, total: item.total - item.basePrice }
          : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate subtotal correctly
  const subtotal = cart.reduce((acc, item) => acc + item.total, 0) || 0;

  // Format price in Naira
  const formatNaira = (amount: number) => {
    if (isNaN(amount) || amount === null || amount === undefined) return "₦0.00";
    return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div>
      {/* Site Header */}
      <SiteHeader />
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Cart Items Section */}
      <div className="md:w-2/3 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">My Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="border-t border-gray-300">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.extras[0]?.image || "/default.png"}
                    alt={item.baseItem}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{item.baseItem}</h3>
                    <p className="text-sm text-gray-500">
                      Includes: {item.extras.map((extra) => `${extra.name} x${extra.quantity}`).join(", ")}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-green-600">{formatNaira(item.total)}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-600">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#FCFCFC"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.412 14.5L25.611 28.117C25.5812 28.6264 25.3577 29.1051 24.9865 29.4551C24.6153 29.8052 24.1243 30.0001 23.614 30H16.386C15.8757 30.0001 15.3847 29.8052 15.0135 29.4551C14.6423 29.1051 14.4188 28.6264 14.389 28.117L13.59 14.5H11.5V13.5C11.5 13.3674 11.5527 13.2402 11.6464 13.1464C11.7402 13.0527 11.8674 13 12 13H28C28.1326 13 28.2598 13.0527 28.3536 13.1464C28.4473 13.2402 28.5 13.3674 28.5 13.5V14.5H26.412ZM18 10.5H22C22.1326 10.5 22.2598 10.5527 22.3536 10.6464C22.4473 10.7402 22.5 10.8674 22.5 11V12H17.5V11C17.5 10.8674 17.5527 10.7402 17.6464 10.6464C17.7402 10.5527 17.8674 10.5 18 10.5ZM17 17L17.5 26H19L18.6 17H17ZM21.5 17L21 26H22.5L23 17H21.5Z" fill="#E06738"/>
                  </svg>

                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary Section */}
      <div className="md:w-1/3 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="border-t border-gray-300 py-4">
          {cart.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between">
                <p>
                  {item.baseItem}
                </p>
                <p className="font-semibold">{formatNaira(item.total)}</p>
              </div>
             <div className="flex">
                 <p>{item.extras.map((extra) => ` . ${extra.name}`)}</p>
                 

             </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between">
            <p className="font-medium">Subtotal</p>
            <p className="font-semibold">{formatNaira(subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Est Tax</p>
            <p className="font-semibold">{formatNaira(200)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Delivery</p>
            <p className="font-semibold">Free</p>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4">
            <p>Total:</p>
            <p>{formatNaira(subtotal + 200)}</p>
          </div>
          <button 
          className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold"
          onClick={() => router.push("/delivery")}
        >
          CONTINUE
        </button>
        </div>
      </div>
    </div>

    </div>  
  );
};

export default CartPage;
