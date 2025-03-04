import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const useAddToCart = () => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) return;

    const fetchUserId = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/user/${storedUsername}`,
        );
        const data = await res.json();
        setUserId(data.data.uuid);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    if (!userId) {
      console.error("User not logged in");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      if (res.ok) {
        console.log("Product added to cart");
        router.push("/cart"); // Redirect ke halaman cart setelah add to cart
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return { addToCart };
};

export default useAddToCart;
