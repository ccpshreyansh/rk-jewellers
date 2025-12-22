"use client";

import { useEffect, useState } from "react";
import useAdminAuth from "@/utils/useAdminAuth";
import {
  updateMetalPrices,
  getMetalPrices,
} from "@/lib/metalPriceService";

export default function AdminMetalPrices() {
  useAdminAuth();

  const [gold14k, setGold14k] = useState("");
  const [gold18k, setGold18k] = useState("");
  const [gold22k, setGold22k] = useState("");
  const [gold24k, setGold24k] = useState("");
  const [silver24k, setSilver24k] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    loadPrices();
  }, []);

  const loadPrices = async () => {
    const data = await getMetalPrices();
    if (!data) return;

    setGold14k(data.gold?.["14k"] || "");
    setGold18k(data.gold?.["18k"] || "");
    setGold22k(data.gold?.["22k"] || "");
    setGold24k(data.gold?.["24k"] || "");
    setSilver24k(data.silver?.["24k"] || "");
    setLastUpdated(`${data.date} • ${data.time}`);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateMetalPrices({
        gold14k: Number(gold14k),
        gold18k: Number(gold18k),
        gold22k: Number(gold22k),
        gold24k: Number(gold24k),
        silver24k: Number(silver24k),
      });
      alert("Prices updated successfully");
      loadPrices();
    } catch {
      alert("Failed to update prices");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow border border-[#eadfce] p-8">

        <h1 className="text-2xl font-semibold text-[#4a0f0b] mb-2">
          Daily Metal Prices
        </h1>

        {lastUpdated && (
          <p className="text-sm text-green-700 bg-green-50 inline-block px-4 py-2 rounded-full mb-6">
            Last updated: {lastUpdated}
          </p>
        )}

        {/* Gold */}
        <h2 className="text-lg font-semibold text-[#4a0f0b] mt-6 mb-4">
          Gold Price (₹ / gm)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["14K Gold", gold14k, setGold14k],
            ["18K Gold", gold18k, setGold18k],
            ["22K Gold", gold22k, setGold22k],
            ["24K Gold", gold24k, setGold24k],
          ].map(([label, value, setter]: any) => (
            <input
              key={label}
              placeholder={label}
              type="number"
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="w-full px-6 py-4 rounded-full border border-[#eadfce] focus:outline-none focus:ring-2 focus:ring-[#c9a24d]"
            />
          ))}
        </div>

        {/* Silver */}
        <h2 className="text-lg font-semibold text-[#4a0f0b] mt-8 mb-4">
          Silver Price (₹ / gm)
        </h2>

        <input
          placeholder="24K Silver"
          type="number"
          value={silver24k}
          onChange={(e) => setSilver24k(e.target.value)}
          className="w-full max-w-sm px-6 py-4 rounded-full border border-[#eadfce] focus:outline-none focus:ring-2 focus:ring-[#c9a24d]"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-10 w-full sm:w-auto px-10 py-4 rounded-full
                     bg-gradient-to-r from-yellow-400 via-[#4a0f0b] to-yellow-600
                     text-white font-semibold shadow-xl hover:scale-105 transition"
        >
          {loading ? "Updating..." : "Update Prices"}
        </button>
      </div>
    </div>
  );
}
