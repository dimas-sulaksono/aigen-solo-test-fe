import React, { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API;

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) return;

    const fetchUserId = async () => {
      try {
        const res = await fetch(`${baseUrl}/user/${storedUsername}`);
        const data = await res.json();
        setUserId(data.data.uuid);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, currentPage]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url =
        statusFilter === "All"
          ? `${baseUrl}/order?page=${currentPage}&size=10`
          : `${baseUrl}/order/filter?status=${encodeURIComponent(statusFilter)}&page=${currentPage}&size=10`;

      const res = await fetch(url);
      const data = await res.json();
      setOrders(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    if (!userId) return;
    try {
      const url = `${baseUrl}/order/${orderId}/status?status=${encodeURIComponent(newStatus)}&changedBy=${userId}`;
      await fetch(url, { method: "PUT" });

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Order Management</h2>

        <div className="mb-4 flex items-center justify-between">
          <label className="text-lg">Filter by Status:</label>
          <select
            className="rounded-lg border p-2"
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

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Order ID</th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">Total Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="text-center">
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">{order.userId}</td>
                    <td className="border p-2">
                      Rp {order.totalPrice.toLocaleString()}
                    </td>
                    <td className="border p-2">{order.status}</td>
                    <td className="border p-2">
                      <select
                        className="rounded border p-1"
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELED">Canceled</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border p-2 text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className="mt-4 flex justify-center">
          <button
            className="mx-1 rounded border bg-gray-300 px-4 py-2"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            className="mx-1 rounded border bg-gray-300 px-4 py-2"
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderDashboard;
