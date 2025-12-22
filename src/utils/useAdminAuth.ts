import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = document.cookie.includes("admin-auth=true");
    if (!isAuth) {
      router.replace("/admin/login");
    }
  }, []);
}
