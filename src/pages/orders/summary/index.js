import ModalBilingInformation from "@/components/molecules/ModalBilingInformation";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/helper/util/formatCurrency";

const dir = process.env.NEXT_PUBLIC_DIR;

const OrderSummary = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleCheckout = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/order/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        console.log("Order placed successfully");
        router.push("/order");
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <section className="bg-white py-8 dark:bg-gray-900 md:py-16">
        <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Order summary
            </h2>
            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {cartItems.map((item) => (
                      <tr key={item.product.id}>
                        <td className="whitespace-nowrap py-4 md:w-[384px]">
                          <div className="flex items-center gap-4">
                            <Image
                              className="h-auto max-h-full w-full"
                              src={`${dir + item.product.imagePath}`}
                              alt={item.product.name}
                              width={80}
                              height={80}
                            />
                            <span className="hover:underline">
                              {item.product.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                          x{item.quantity}
                        </td>
                        <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                          Rp
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-6">
                <div className="space-y-4">
                  <dl className="flex items-center justify-between gap-2">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      Rp
                      {cartItems
                        .reduce(
                          (total, item) =>
                            total + item.product.price * item.quantity,
                          0,
                        )
                        .toLocaleString()}
                    </dd>
                  </dl>
                </div>
                <div className="gap-4 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    onClick={() => router.push("/products")}
                  >
                    Return to Shopping
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                  >
                    Send the order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <ModalBilingInformation id="billingInformationModal" />
    </>
  );
};

export default OrderSummary;
