import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrderHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/order-history/${id}`,
        );
        const data = await res.json();
        setOrderHistory(
          data.sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt)),
        ); // Sort descending
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [id]);

  if (loading) return <p>Loading order details...</p>;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Track the delivery of order #{id}
        </h2>

        <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
          <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
            <div className="space-y-4 p-6">
              <div className="flex items-center gap-6">
                <Image
                  className="h-14 w-14 shrink-0"
                  src="/placeholder.png"
                  alt="Product image"
                  width={56}
                  height={56}
                />
                <p className="min-w-0 flex-1 font-medium text-gray-900 dark:text-white">
                  Product Name
                </p>
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Product ID:
                  </span>{" "}
                  123456
                </p>
                <p className="text-base font-normal text-gray-900 dark:text-white">
                  x1
                </p>
                <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  $100
                </p>
              </div>
            </div>
            <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-lg font-bold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd className="text-lg font-bold text-gray-900 dark:text-white">
                  $100
                </dd>
              </dl>
            </div>
          </div>

          <div className="mt-6 grow sm:mt-8 lg:mt-0">
            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order history
              </h3>
              <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                {orderHistory.map((item, index) => (
                  <li
                    key={index}
                    className="mb-10 ms-6 text-primary-700 dark:text-primary-500"
                  >
                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 11.917 9.724 16.5 19 7.5"
                        />
                      </svg>
                    </span>
                    <h4 className="mb-0.5 text-base font-semibold">
                      {new Date(item.changedAt).toLocaleString()}
                    </h4>
                    <p className="text-sm">{item.status}</p>
                  </li>
                ))}
              </ol>
              <div className="gap-4 sm:flex sm:items-center">
                <button
                  type="button"
                  className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900"
                >
                  Cancel the order
                </button>
                <a
                  href="#"
                  className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white"
                >
                  Order details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
