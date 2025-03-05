import React, { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

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

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/order/${userId}?page=${currentPage}&size=10`,
        );
        const data = await res.json();
        setOrders(data.data.content);
        setTotalPages(data.data.totalPages);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId, currentPage]);

  const handleCancel = async (orderId) => {
    try {
      await fetch(`http://localhost:8080/api/order/cancel/${orderId}`, {
        method: "PUT",
      });
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "CANCELED" } : order,
        ),
      );
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELED">Canceled</option>
            </select>
          </div>

          <div className="mt-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border-b border-gray-200 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p>
                      Order ID:{" "}
                      <a
                        href={`/order/${order.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {order.id}
                      </a>
                    </p>
                    <p>
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p>Price: Rp {order.totalPrice.toLocaleString()}</p>
                    <p>
                      Status:{" "}
                      <span className="font-semibold">{order.status}</span>
                    </p>
                  </div>
                  <div>
                    {order.status === "PENDING" ? (
                      <button
                        className="rounded-lg bg-red-500 px-4 py-2 text-white"
                        onClick={() => handleCancel(order.id)}
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <a
                        href={`/product/${order.id}`}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                      >
                        Buy Again
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="rounded-l-lg border border-gray-300 px-3 py-2"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            >
              Prev
            </button>
            <span className="border px-4 py-2">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              className="rounded-r-lg border border-gray-300 px-3 py-2"
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
