import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const baseUrl = "http://localhost:8080/api";

const useAuthGuard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      const storedUsername = localStorage.getItem("username");

      if (!isLoggedIn || !storedUsername) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/user/${storedUsername}`);
        const data = await res.json();

        if (data.status === 200) {
          setUserId(data.data.uuid);
          if (data.data.role === "ADMIN") {
            setIsAuthorized(true);
          } else {
            router.replace("/products");
          }
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [router]);

  return { loading, isAuthorized, userId };
};

export default useAuthGuard;
