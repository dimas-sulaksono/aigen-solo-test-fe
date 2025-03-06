import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const api = process.env.NEXT_PUBLIC_API;

const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkCustomerSession = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const storedUsername = localStorage.getItem("username");

      if (!isLoggedIn || !storedUsername) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch(`${api}/user/${storedUsername}`);
        const data = await res.json();

        if (data.status === 200) {
          setUserId(data.data.uuid);
          setIsAuthenticated(true);
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error fetching customer session:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkCustomerSession();
  }, [router]);

  return { loading, isAuthenticated, userId };
};

export default useAuth;
