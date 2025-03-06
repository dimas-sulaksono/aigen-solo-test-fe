import React, { useEffect, useState } from "react";
import useAuthGuard from "@/hooks/useAuthGuard";

const api = process.env.NEXT_PUBLIC_API;

const OrderDashboard = () => {
  const { loading, isAuthorized, userId } = useAuthGuard();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [orderIdFilter, setOrderIdFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (isAuthorized) fetchOrders();
  }, [isAuthorized, statusFilter, orderIdFilter, currentPage]);

  const fetchOrders = async () => {
    setDataLoading(true);
    try {
      let url = `${api}/order?page=${currentPage}&size=10`;
      if (statusFilter !== "All") {
        url = `${api}/order/filter?status=${encodeURIComponent(statusFilter)}&page=${currentPage}&size=10`;
      }
      if (orderIdFilter) {
        url = `${api}/order/detail/${orderIdFilter}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setOrders(
        Array.isArray(data.data) ? data.data : data.data ? [data.data] : [],
      );
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard: " + text);
  };

  const handleStatusChange = (order, newStatus) => {
    setSelectedOrder(order);
    setNewStatus(newStatus);
    setShowConfirmModal(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedOrder || !newStatus) return;
    try {
      const url = `${api}/order/${selectedOrder.id}/status?status=${encodeURIComponent(newStatus)}&changedBy=${userId}`;
      const response = await fetch(url, { method: "PUT" });
      if (response.ok) {
        fetchOrders();
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
    setShowConfirmModal(false);
  };

  if (loading || dataLoading) return <p>Loading orders...</p>;
  if (!isAuthorized) return null;

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Order Management</h2>

        <div className="mb-4 flex items-center justify-between">
          <label className="text-lg">Filter by Status:</label>

          <input
            type="text"
            placeholder="Search by Order ID"
            className="rounded-lg border p-2"
            value={orderIdFilter}
            onChange={(e) => setOrderIdFilter(e.target.value)}
          />

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

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Total Payment</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Transaction Date</th>
              <th className="border p-2">Action</th>
              <th className="border p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td
                  className="max-w-[150px] cursor-pointer truncate border p-2 hover:text-blue-500"
                  onClick={() => copyToClipboard(order.id || order.orderId)}
                >
                  {order.id || order.orderId || "-"}
                </td>
                <td className="border p-2">
                  {order?.user?.name || order?.username || "-"}
                </td>
                <td className="border p-2">
                  Rp{" "}
                  {order.totalPrice ? order.totalPrice.toLocaleString() : "-"}
                </td>
                <td className="border p-2">
                  {order.status ? order.status : "-"}
                </td>
                <td className="border p-2">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {order.id || order.orderId ? (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order, e.target.value)
                      }
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELED">Canceled</option>
                    </select>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border p-2">
                  {order.id || order.orderId ? (
                    <a
                      href={`/dashboard/orders/${order.id || order.orderId}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded bg-white p-6 shadow-lg">
            <p>
              Are you sure you want to change the order status to {newStatus}?
            </p>
            <button
              onClick={confirmStatusChange}
              className="rounded bg-green-500 px-4 py-2 text-white"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="ml-2 rounded bg-red-500 px-4 py-2 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
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
    </section>
  );
};

export default OrderDashboard;
