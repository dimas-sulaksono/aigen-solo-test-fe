import ModalBilingInformation from "@/components/molecules/ModalBilingInformation";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/helper/util/formatCurrency";
import useAuth from "@/hooks/useAuth";

const api = process.env.NEXT_PUBLIC_API;
const dir = process.env.NEXT_PUBLIC_DIR;

const OrderSummary = () => {
  const { loading, isAuthenticated, userId } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      setCartLoading(true);
      try {
        const res = await fetch(`${api}/cart/${userId}`);
        const data = await res.json();
        setCartItems(data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${api}/order/${userId}`, {
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

  if (loading) return <p>Checking session...</p>;
  if (!isAuthenticated) return null; // Redirect handled in hook

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
                          Rp{" "}
                          {formatCurrency(item.product.price * item.quantity)}
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
                      Rp{" "}
                      {formatCurrency(
                        cartItems.reduce(
                          (total, item) =>
                            total + item.product.price * item.quantity,
                          0,
                        ),
                      )}
                    </dd>
                  </dl>
                </div>
                <div className="gap-4 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900"
                    onClick={() => router.push("/products")}
                  >
                    Return to Shopping
                  </button>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white"
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
