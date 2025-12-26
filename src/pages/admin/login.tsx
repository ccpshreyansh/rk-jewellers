import { useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig"; // adjust path if needed

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!password) {
      alert("Enter password");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Fetch password from Firestore
    const passRef = doc(db, "password", "adminPass");
const passSnap = await getDoc(passRef);

if (!passSnap.exists()) {
  alert("Admin password not configured");
  return;
}

const firebasePassword = passSnap.data()?.password;


      if (password === firebasePassword) {
        document.cookie = "admin-auth=true; path=/";
        router.push("/admin");
      } else {
        alert("Invalid password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-medium hover:scale-105 transition disabled:opacity-60"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </div>
    </div>
  );
}
