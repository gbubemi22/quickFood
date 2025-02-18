import { Home, Users } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { RecentOrders } from "@/components/recent-orders";
import { TopVendors } from "@/components/top-vendors";
import { MostPurchased } from "@/components/most-purchased";

// Mock data fetched from the API
const dashboardStats = {
  success: true,
  message: "Fetched successfully",
  data: {
    customers: 11,
    vendors: 1,
    totalIncome: 30100.32
  }
};

export default function DashboardPage() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full">
        <main className="flex w-full gap-6 p-6">
          <div className="flex-1 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <StatCard
                title="Total Income"
                value={`$${dashboardStats.data.totalIncome.toLocaleString()}`}
                description="+30% This month"
                icon={Home}
                className="bg-blue-50"
              />
              <StatCard
                title="Total Orders"
                value="615"
                icon={Home}
                className="bg-green-50"
                seeMore
              />
              <StatCard
                title="Customers"
                value={dashboardStats.data.customers.toString()}
                icon={Users}
                className="bg-blue-50"
                seeMore
              />
            </div>
            <RecentOrders />
          </div>
          <div className="w-[300px] space-y-6">
            <TopVendors />
          </div>
        </main>
      </div>
    </div>
  );
}