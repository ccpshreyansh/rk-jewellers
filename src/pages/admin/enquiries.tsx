"use client";

import { useEffect, useState } from "react";
import useAdminAuth from "@/utils/useAdminAuth";
import {
  fetchEnquiries,
  deleteEnquiry,
  markContacted,
} from "@/lib/es";

export default function AdminEnquiries() {
  useAdminAuth();

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    setLoading(true);
    const data = await fetchEnquiries();
    setEnquiries(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await deleteEnquiry(id);
    loadEnquiries();
  };

  const handleContacted = async (id: string) => {
    await markContacted(id);
    loadEnquiries();
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] px-4 py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow border border-[#eadfce] p-6">

        <h1 className="text-2xl font-semibold text-[#4a0f0b] mb-6">
          Customer Enquiries
        </h1>

        {loading ? (
          <p className="text-center py-10">Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No enquiries found
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[#4a0f0b] border-b">
                  <th className="py-3">Name</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b hover:bg-[#fdf3e7]"
                  >
                    <td className="py-3 font-medium">{e.name}</td>
                    <td>{e.phone}</td>
                    <td className="max-w-xs truncate">
                      {e.message}
                    </td>
                    <td>
                      {e.createdAt?.toDate
                        ? e.createdAt.toDate().toLocaleString()
                        : "-"}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          e.status === "contacted"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {e.status || "new"}
                      </span>
                    </td>

                    <td className="text-right space-x-2">
                      {e.status !== "contacted" && (
                        <button
                          onClick={() => handleContacted(e.id)}
                          className="px-3 py-1 text-xs rounded-full bg-[#4a0f0b] text-white"
                        >
                          Mark Done
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(e.id)}
                        className="px-3 py-1 text-xs rounded-full bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
