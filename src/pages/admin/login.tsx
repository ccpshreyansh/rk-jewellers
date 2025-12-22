import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD)
        if (password === "admin123")
        
        {
      document.cookie = "admin-auth=true; path=/";
      router.push("/admin");
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f3]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-[#4a0f0b] mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-medium hover:scale-105 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
