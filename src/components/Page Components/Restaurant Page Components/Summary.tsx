import { CheckoutProgress } from "@/components/checkout-progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SummaryPageProps {
  setCurrentScene: (scene: string) => void; // Define the type for setCurrentScene
}
                                                                                                      
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SummaryPage({ setCurrentScene }: SummaryPageProps) {
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="mb-12">
        <CheckoutProgress currentStep="summary" />
      </div>
      <div className="space-y-8">
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Onion</span>
              <span>$150.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Garlic</span>
              <span>$150.00</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>$350.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Est Tax</span>
                <span>$2.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>$12.22</span>
              </div>
            </div>
          </div>
        </div>
        <Link href="/checkout/payment">
          <Button className="w-full bg-[#FF4500] hover:bg-[#FF4500]/90">
            CONTINUE
          </Button>
        </Link>
      </div>
    </div>
  );
}
