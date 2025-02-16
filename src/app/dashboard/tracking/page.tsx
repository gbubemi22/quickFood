import { Checkbox } from "@/components/ui/checkbox"
import { MapPin } from "lucide-react"

const trackingItems = [
  {
    id: "#334903",
    date: "Oct 4, 2024",
    status: "Delivered",
  },
  {
    id: "#334903",
    date: "Oct 4, 2024",
    status: "Dispatched",
  },
  // Add more items as needed
]

export default function TrackingPage() {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Tracking</h2>
        </div>
        <div className="space-y-2">
          {trackingItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border bg-white p-4">
              <div className="flex items-center gap-4">
                <Checkbox />
                <div>
                  <p className="font-medium">{item.id}</p>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  item.status === "Delivered" ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg border bg-white p-4">
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Order #2238dsf</h3>
            <span className="text-sm text-gray-500">Oct 4, 2024</span>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Order has left the store</span>
            <span className="ml-auto text-sm">25 min</span>
          </div>
          <p className="text-sm text-gray-500">Gillian Store</p>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm">465 Peckham, London</p>
              <p className="text-sm text-gray-500">Destination</p>
            </div>
          </div>
        </div>
        <div className="aspect-video w-full rounded-lg bg-gray-100">
          {/* Map would go here */}
          <div className="h-full w-full rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

