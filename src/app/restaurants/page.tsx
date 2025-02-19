"use client";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { RestaurantCard } from "@/components/restaurant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const foodItems = [
  {
    id: "1",
    name: "Fried Rice & Chicken",
    image: "/basket1.png",
    price: "$12.99",
    deliveryTime: "25 min",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Fried Rice & Chicken",
    image: "/basket1.png",
    price: "$12.99",
    deliveryTime: "25 min",
    isAvailable: false,
  },
  {
    id: "3",
    name: "Fried Rice & Chicken",
    image: "/basket1.png",
    price: "$12.99",
    deliveryTime: "25 min",
    isAvailable: true,
  },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Food");
  
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-12">
      <SiteHeader />
      <main className="mx-auto mt-6 max-w-screen-xl">
        {/* Tab Navigation */}
        <div className="flex justify-start space-x-4 border-b border-gray-300 pb-2">
          {["Food", "Fresh Items", "Restaurants"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
        
        {/* Search and Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search food item"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
        
        {/* Food Items */}
        <section className="py-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {foodItems
              .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item) => (
                <RestaurantCard key={item.id} {...item} />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
