"use client"
import { useEffect, useState } from "react";

export default function VendorDashboard() {
  const [stats, setStats] = useState<{
    totalIncome: number;
    totalOrders: number;
    vendorId: string;
    totalCustomers: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://app.quickfoodshop.co.uk/v1/vendor-dashboard/stats");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setStats(data.data); // Assuming `data` contains `{ data: { totalIncome, totalOrders, ... } }`
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Vendor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-bold">Total Income</h2>
          <p>${stats.totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-bold">Total Orders</h2>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-bold">Total Customers</h2>
          <p>{stats.totalCustomers}</p>
        </div>
      </div>
    </div>
  );
}
