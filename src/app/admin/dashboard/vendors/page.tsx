"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PendingVendors } from "@/app/admin/components/pending-vendors";

interface Vendor {
  _id: string;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  block: boolean;
}

export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [pendingVendors, setPendingVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [pendingLoading, setPendingLoading] = useState(false);

  useEffect(() => {
    fetchVendors();
    fetchPendingVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://app.quickfoodshop.co.uk/v1/dashboard/active-vendors"
      );
      const data = await response.json();
      if (data.success) {
        setVendors(data.data);
      } else {
        console.error("Failed to fetch vendors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingVendors = async () => {
    setPendingLoading(true);
    try {
      const response = await fetch(
        "https://app.quickfoodshop.co.uk/v1/dashboard/pending-vendors"
      );
      const data = await response.json();
      if (data.success) {
        setPendingVendors(data.data);
      } else {
        console.error("Failed to fetch pending vendors:", data.message);
      }
    } catch (error) {
      console.error("Error fetching pending vendors:", error);
    } finally {
      setPendingLoading(false);
    }
  };

  const toggleBlockStatus = async (vendorId: string, isBlocked: boolean) => {
    try {
      const response = await fetch(
        `https://app.quickfoodshop.co.uk/v1/dashboard/block-unblock/${vendorId}`,
        { method: "GET" }
      );
      const result = await response.json();
      if (result.status) {
        setVendors((prev) =>
          prev.map((vendor) =>
            vendor._id === vendorId ? { ...vendor, block: !isBlocked } : vendor
          )
        );
      } else {
        console.error("Failed to update status:", result.message);
      }
    } catch (error) {
      console.error("Error updating vendor status:", error);
    }
  };

  const handleApproveReject = async (vendorId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(
        `https://app.quickfoodshop.co.uk/v1/dashboard/approve-reject/${vendorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action }),
        }
      );
      const result = await response.json();
      if (result.success) {
        // Refresh the pending vendors list
        fetchPendingVendors();
        // Refresh the active vendors list if needed
        fetchVendors();
      } else {
        console.error("Failed to update status:", result.message);
      }
    } catch (error) {
      console.error("Error updating vendor status:", error);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
        Active Vendors
      </h2>
      {loading ? (
        <p className="text-center">Loading vendors...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 md:px-4 md:py-3">Vendor ID</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Store Name</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Contact</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Email</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Reg Date</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id} className="text-center">
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {vendor._id}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {vendor.businessName}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {vendor.firstName} {vendor.lastName}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {vendor.email}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {new Date(vendor.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    <Button
                      variant={vendor.block ? "success" : "destructive"}
                      onClick={() => toggleBlockStatus(vendor._id, vendor.block)}
                      className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
                    >
                      {vendor.block ? "Unblock" : "Block"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="w-full md:w-[300px] space-y-6 mt-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Pending Vendors
        </h2>
        {pendingLoading ? (
          <p className="text-center">Loading pending vendors...</p>
        ) : (
          <table className="w-full border border-gray-200 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2 md:px-4 md:py-3">Vendor ID</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Store Name</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Contact</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Email</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Reg Date</th>
                <th className="border px-3 py-2 md:px-4 md:py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingVendors.map((vendor) => (
                <tr key={vendor._id} className="text-center">
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {vendor._id}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {vendor.businessName}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {vendor.firstName} {vendor.lastName}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {vendor.email}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    {new Date(vendor.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-3 py-2 md:px-4 md:py-3">
                    <Button
                      variant="success"
                      onClick={() => handleApproveReject(vendor._id, 'approve')}
                      className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleApproveReject(vendor._id, 'reject')}
                      className="text-xs md:text-sm px-2 py-1 md:px-3 md:py-2 ml-2"
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}