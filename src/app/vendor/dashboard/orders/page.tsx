import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"

const orders = [
  {
    id: "#334903",
    image: "/placeholder.svg",
    description: "Rice and Jollof Sallad",
    customer: "customer@gmail.com",
    date: "Oct 11, 2024",
    paymentStatus: "Successful",
    price: "$302",
    orderStatus: "Delivered",
  },
  {
    id: "#PD123d",
    image: "/placeholder.svg",
    description: "Rice and Jollof Sallad",
    customer: "customer@gmail.com",
    date: "Oct 14, 2024",
    paymentStatus: "Successful",
    price: "$302",
    orderStatus: "Dispatched",
  },
  // Add more orders as needed
]

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <button className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm">
          Export
        </button>
      </div>
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Item description</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt={order.description}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                    />
                    {order.description}
                  </div>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      order.paymentStatus === "Successful"
                        ? "bg-green-100 text-green-600"
                        : order.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : order.orderStatus === "Dispatched"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </TableCell>
                <TableCell>
                  <button className="rounded-lg p-2 hover:bg-gray-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

