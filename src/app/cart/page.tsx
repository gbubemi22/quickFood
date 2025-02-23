"use client";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  baseItem: string;
  basePrice: number;
  extras: {
    name: string;
    quantity: number;
    price: number;
    category: string;
    image: string;
  }[];
  total: number;
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart) || [];
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

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1, total: item.total + item.basePrice } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1, total: item.total - item.basePrice }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.total, 0) || 0;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  return (
    <div>
      <SiteHeader />
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
        <div className="md:w-2/3 bg-white p-4 rounded-lg shadow w-full">
          <h2 className="text-lg font-semibold mb-4">My Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="border-t border-gray-300">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between border-b py-4 gap-2">
                  <img
                    src={item.extras[0]?.image || "/default.png"}
                    alt={item.baseItem}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg"
                  />
                  <div className="flex-1 min-w-[120px]">
                    <h3 className="font-medium text-sm md:text-base">{item.baseItem}</h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      Includes: {item.extras.map((extra) => `${extra.name} x${extra.quantity}`).join(", ")}
                    </p>
                  </div>
                  <p className="font-semibold text-green-600 text-sm md:text-base">{formatNaira(item.total)}</p>
                  <div className="flex items-center gap-1 md:gap-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">-</button>
                    <span className="font-medium text-sm md:text-base">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-200 rounded-md">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-600 text-xs md:text-base">
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.412 4.5L14.611 18.117C14.5812 18.6264 14.3577 19.1051 13.9865 19.4551C13.6153 19.8052 13.1243 20.0001 12.614 20H5.386C4.87575 20.0001 4.38475 19.8052 4.0135 19.4551C3.64226 19.1051 3.41885 18.6264 3.389 18.117L2.59 4.5H0.5V3.5C0.5 3.36739 0.552679 3.24021 0.646447 3.14645C0.740215 3.05268 0.867392 3 1 3H17C17.1326 3 17.2598 3.05268 17.3536 3.14645C17.4473 3.24021 17.5 3.36739 17.5 3.5V4.5H15.412ZM7 0.5H11C11.1326 0.5 11.2598 0.552679 11.3536 0.646447C11.4473 0.740215 11.5 0.867392 11.5 1V2H6.5V1C6.5 0.867392 6.55268 0.740215 6.64645 0.646447C6.74021 0.552679 6.86739 0.5 7 0.5ZM6 7L6.5 16H8L7.6 7H6ZM10.5 7L10 16H11.5L12 7H10.5Z" fill="#E06738"/>
</svg>

                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:w-1/3 bg-white p-4 rounded-lg shadow w-full">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="border-t border-gray-300 py-4">
            {cart.map((item) => (
              <div key={item.id} className="mb-2 text-sm md:text-base">
                <div className="flex justify-between">
                  <p>{item.baseItem}</p>
                  <p className="font-semibold">{formatNaira(item.total)}</p>
                </div>
                <p className="text-xs text-gray-500">{item.extras.map((extra) => ` • ${extra.name}`).join(" ")}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300 pt-4 text-sm md:text-base">
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
            <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 font-semibold" onClick={() => router.push("/delivery")}>
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
