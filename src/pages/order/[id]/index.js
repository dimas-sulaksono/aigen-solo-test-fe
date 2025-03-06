import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import Icons from "@/components/atoms/icons";

const api = process.env.NEXT_PUBLIC_API;
const dir = process.env.NEXT_PUBLIC_DIR;

const OrderDetail = () => {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrderDetail = async () => {
      try {
        const res = await fetch(`${api}/order/detail/${id}`);
        const data = await res.json();
        setOrder(data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    const fetchOrderHistory = async () => {
      try {
        const res = await fetch(`${api}/order-history/${id}`);
        const data = await res.json();
        setOrderHistory(
          data.sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt)),
        );
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setOrderLoading(false);
      }
    };

    fetchOrderDetail();
    fetchOrderHistory();
  }, [id]);

  if (loading) return <p>Checking session...</p>;
  if (!isAuthenticated) return null;
  if (orderLoading) return <p>Loading order details...</p>;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Track the delivery of order #{id}
        </h2>

        <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
          <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
            <div className="space-y-4 p-6">
              {order &&
                order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-6">
                    <Image
                      className="h-14 w-14 shrink-0"
                      src={`${dir + item.product.imagePath}`}
                      alt={item.product.name}
                      width={56}
                      height={56}
                    />
                    <p className="min-w-0 flex-1 font-medium text-gray-900 dark:text-white">
                      {item.product.name} - x{item.quantity}
                    </p>
                  </div>
                ))}
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
                      <Icons.Checked />
                    </span>
                    <h4 className="mb-0.5 text-base font-semibold">
                      {new Date(item.changedAt).toLocaleString()}
                    </h4>
                    <p className="text-sm">{item.status}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-start">
          <button
            onClick={() => router.back()}
            className="rounded-lg bg-gray-300 px-4 py-2 text-gray-900 hover:bg-gray-400"
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
