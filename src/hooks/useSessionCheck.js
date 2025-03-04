import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useSessionCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login"); // Redirect ke login jika belum login
    } else {
      setIsLoading(false); // Jika sudah login, tampilkan halaman
    }
  }, [router]);

  return isLoading;
};

export default useSessionCheck;
