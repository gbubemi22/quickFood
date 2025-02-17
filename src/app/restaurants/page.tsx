"use client";
import { SiteHeader } from "@/components/site-header";
import { RestaurantCard } from "@/components/restaurant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
interface Restaurant {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  price: string;
  isAvailable: boolean;
  tags: string[];
}

const restaurants: Restaurant[] = [  {
    id: "1",
    name: "Open Sea Restaurant",
    image: "/Frame 818.png",
    location: "London, UK",
    rating: 4.5,
    reviews: 28,
    deliveryTime: "25 min",
    price: "₦2,500",
    isAvailable: true,
    tags: ["food", "fresh items", "restaurants"],
  },
  {
    id: "2",
    name: "Gillian Store",
    image: "/Frame 818.png",
    location: "Strutton Avenue",
    rating: 4.5,
    reviews: 28,
    deliveryTime: "25 min",
    price: "₦2,500",
    isAvailable: false,
    tags: ["food", "restaurants"],
  },
  {
    id: "3",
    name: "Tasty Bites",
    image: "/Frame 818.png",
    location: "New York, USA",
    rating: 4.8,
    reviews: 50,
    deliveryTime: "30 min",
    price: "₦3,000",
    isAvailable: true,
    tags: ["food", "restaurants"],
  },
  {
    id: "4",
    name: "Fresh Fusion",
    image: "/Frame 818.png",
    location: "Paris, France",
    rating: 4.9,
    reviews: 75,
    deliveryTime: "20 min",
    price: "₦3,500",
    isAvailable: true,
    tags: ["fresh items", "restaurants"],
  },

  {
    id: "5",
    name: "Spice Route",
    image: "/Frame 818.png",
    location: "Mumbai, India",
    rating: 4.7,
    reviews: 40,
    deliveryTime: "35 min",
    price: "₦2,800",
    isAvailable: true,
    tags: ["fresh items", "restaurants"],
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("Price");

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesPrice =
      selectedPrice === "Price" || restaurant.price === selectedPrice;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main className=" mx-auto mt-12  w-full max-w-screen-2xl">
        <section className="bg-[#E8F3EA] px-24 rounded-lg w-full h-auto">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-xl  tracking-tight text-green-600 lg:text-5xl">
                  Grab Up to 50% discount off 10 fresh food items purchase
                </h1>
                <Button className="w-fit bg-[#FF4500] hover:bg-[#FF4500]/90">
                  BUY NOW
                </Button>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <img
                  src="/hero2.png"
                  alt="Chef"
                  className="max-h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <h2 className="mb-8 text-2xl font-semibold">
              Browse Food Collection
            </h2>
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex gap-2 border-b border-primary pb-2">
                <Button variant="ghost" className="font-medium">
                  Food
                </Button>
                <Button variant="ghost" className="font-medium">
                  Fresh Items
                </Button>
                <Button variant="ghost" className="font-medium">
                  Restaurants
                </Button>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search food item"
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="rounded-md border p-2"
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  >
                    <option>Price</option>
                    <option value="₦2,500">₦2,500</option>
                    <option value="₦3,000">₦3,000</option>
                    <option value="₦3,500">₦3,500</option>
                    <option value="₦2,800">₦2,800</option>
                  </select>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
