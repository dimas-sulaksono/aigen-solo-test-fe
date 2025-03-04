import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icons from "@/components/atoms/icons";
import OrderSummary from "@/components/organism/OrderSummary";
import { formatCurrency } from "@/helper/util/formatCurrency";
import useSessionCheck from "@/hooks/useSessionCheck";

const dir = process.env.NEXT_PUBLIC_DIR;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const isLoading = useSessionCheck();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    const fetchUserId = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/user/${username}`);
        const data = await res.json();
        setUserId(data.data.uuid);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [username]);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/cart/${userId}`);
        const data = await res.json();
        setCartItems(data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: newQuantity }),
      });

      if (res.ok) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: newQuantity }
              : item,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <section className="bg-white py-8 dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="w-full lg:max-w-2xl xl:max-w-4xl">
            {loading ? (
              <p>Loading cart...</p>
            ) : cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 rounded-lg border p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <Image
                      src={`${dir + item.product.imagePath}`}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <Link
                      href="#"
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="rounded border p-1"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="rounded border p-1"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-gray-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <OrderSummary cartItems={cartItems} />
        </div>
      </div>
    </section>
  );
};

export default Cart;
