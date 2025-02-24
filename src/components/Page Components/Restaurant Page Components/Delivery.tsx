import { CheckoutProgress } from "@/components/checkout-progress";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";

interface DeliveryPageProps {
  setCurrentScene: (scene: string) => void; // Define the type for setCurrentScene
}

export default function DeliveryPage({ setCurrentScene }: DeliveryPageProps) {
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="mb-12">
        <CheckoutProgress currentStep="delivery" />
      </div>
      <div className="space-y-8">
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Delivery Address</h2>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <p>49 Woodhall Hills Golf Club, LONDON</p>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>25 min</span>
              </div>
            </div>
          </div>
          <Button className="mt-4" variant="outline">
            Change Address
          </Button>
        </div>
        <Link href="/checkout/summary">
          <Button className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90">
            CONTINUE
          </Button>
        </Link>
        <Button onClick={() => setCurrentScene("checkout")}>
          Go to Checkout
        </Button>
        <Button onClick={() => setCurrentScene("payment")}>
          Go to Payment
        </Button>
      </div>
    </div>
  );
}
