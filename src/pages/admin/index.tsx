"use client";

import Link from "next/link";
import useAdminAuth from "@/utils/useAdminAuth";

export default function AdminDashboard() {
  useAdminAuth();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-8">
      {/* Heading */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-[#4a0f0b]">
        Admin Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Add Category */}
        <Link
          href="/admin/add-category"
          className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-[#580F09] mb-2">
              Add Category
            </h2>
            <p className="text-sm text-gray-600">
              Create & manage product categories
            </p>
          </div>

          <span className="mt-6 inline-block text-center px-4 py-2 bg-[#580F09] text-white rounded-lg group-hover:bg-[#6d130c] transition">
            Go →
          </span>
        </Link>

        {/* Add Product */}
        <Link
          href="/admin/add-product"
          className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-[#580F09] mb-2">
              Add Product
            </h2>
            <p className="text-sm text-gray-600">
              Add jewellery products with images & price
            </p>
          </div>

          <span className="mt-6 inline-block text-center px-4 py-2 bg-[#580F09] text-white rounded-lg group-hover:bg-[#6d130c] transition">
            Go →
          </span>
        </Link>



           <Link
          href="/admin/enquiries"
          className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-[#580F09] mb-2">
              Enquiry Board
            </h2>
            <p className="text-sm text-gray-600">
             View & manage customer
            </p>
          </div>

          <span className="mt-6 inline-block text-center px-4 py-2 bg-[#580F09] text-white rounded-lg group-hover:bg-[#6d130c] transition">
            Go →
          </span>
        </Link>


           <Link
          href="/admin/metal"
          className="group bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold text-[#580F09] mb-2">
              Gold & Metal Rates
            </h2>
            <p className="text-sm text-gray-600">
            Update Your Shop rates
            </p>
          </div>

          <span className="mt-6 inline-block text-center px-4 py-2 bg-[#580F09] text-white rounded-lg group-hover:bg-[#6d130c] transition">
            Go →
          </span>
        </Link>
      </div>
    </div>
  );
}
