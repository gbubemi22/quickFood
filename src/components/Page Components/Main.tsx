import { Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { Button } from "../ui/button";
interface PageProps {
  setCurrentScene: (scene: string) => void; // Define the type for setCurrentScene
}
const Main = ({ setCurrentScene }: PageProps) => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <Image
          src="/public/placeholder.jpg"
          alt="Restaurant food"
          width={600}
          height={400}
          className="rounded-lg object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">Open Sea Restaurant</h1>
        <p className="mt-2 text-gray-600">
          A plate of Jollof Rice with Assorted Meat and Fish, prepared with
          unique Nigerian spices and seasoning
        </p>
        <div className="mt-6 flex items-center gap-4">
          <Link href="/restaurants/1">
            <div className="flex items-center gap-2">
              <Image
                src="/placeholder.svg"
                alt="Restaurant"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-medium">Open Sea Restaurant</span>
            </div>
          </Link>
          <Button variant="outline" size="sm">
            Add review
          </Button>
        </div>
        <div className="mt-6 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">25 min</p>
              <p className="text-sm text-gray-600">Delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Birmingham</p>
              <p className="text-sm text-gray-600">Location</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">4.5</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Previous Orders</h2>
          <div className="space-y-4">
            <div className="grid gap-4">
              <h3 className="font-medium">Protein</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <Image
                    src="/placeholder.svg"
                    alt="Beef"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>Beef</span>
                  <span className="ml-auto">x 1</span>
                  <Button variant="ghost" size="sm" className="text-green-600">
                    Reorder
                  </Button>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <Image
                    src="/placeholder.svg"
                    alt="Fish"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>Fish</span>
                  <span className="ml-auto">x 0</span>
                  <Button variant="ghost" size="sm" className="text-green-600">
                    Reorder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            setCurrentScene("summary");
            console.log("clicked");
          }}
          className="mt-8 w-full bg-[#FF4500] hover:bg-[#FF4500]/90"
        >
          BUY FROM HERE
        </Button>
      </div>
    </div>
  );
};

export default Main;
