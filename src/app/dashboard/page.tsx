import { Home, Users } from "lucide-react";

import { StatCard } from "@/components/stat-card";
import { RecentOrders } from "@/components/recent-orders";
import { Favorites } from "@/components/favorites";
import { MostPurchased } from "@/components/most-purchased";

export default function DashboardPage() {
  return (
    <div className="flex w-full  min-h-screen ">
      <div className="w-full">
        <main className="flex w-full gap-6 p-6">
          <div className="flex-1 space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <StatCard
                title="Total Income"
                value="380.0K"
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
                value="366"
                icon={Users}
                className="bg-blue-50"
                seeMore
              />
            </div>
            <RecentOrders />
          </div>
          <div className="w-[300px] space-y-6">
            <Favorites />
            <MostPurchased />
          </div>
        </main>
      </div>
    </div>
  );
}
