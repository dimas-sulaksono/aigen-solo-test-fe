import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthGuard from "@/hooks/useAuthGuard";

const api = process.env.NEXT_PUBLIC_API;

const OrderDetail = () => {
  const { loading, isAuthorized } = useAuthGuard();
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (isAuthorized && orderId) {
      fetchOrderDetail();
      fetchOrderHistory();
    }
  }, [isAuthorized, orderId]);

  const fetchOrderDetail = async () => {
    setDataLoading(true);
    try {
      const res = await fetch(`${api}/order/detail/${orderId}`);
      const data = await res.json();
      setOrder(data.data);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const res = await fetch(`${api}/order-history/${orderId}`);
      const data = await res.json();
      setOrderHistory(
        data.sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt)),
      ); // Sort descending
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  if (loading || dataLoading) return <p>Loading order details...</p>;
  if (!isAuthorized) return null;
  if (!order) return <p>Order not found.</p>;

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Order Details</h2>
        <p className="mb-2">
          <strong>Order ID:</strong> {order.orderId}
        </p>
        <p className="mb-4">
          <strong>Total Price:</strong> Rp {order.totalPrice.toLocaleString()}
        </p>

        <table className="mb-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Product</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{item.product.name}</td>
                <td className="border p-2">
                  Rp {item.product.price.toLocaleString()}
                </td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">
                  Rp {(item.product.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="mb-4 mt-6 text-xl font-semibold">Order History</h3>
        <ul className="rounded-lg border border-gray-300 p-4">
          {orderHistory.length > 0 ? (
            orderHistory.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>{new Date(item.changedAt).toLocaleString()}:</strong>{" "}
                {item.status}
              </li>
            ))
          ) : (
            <p>No history available.</p>
          )}
        </ul>

        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </section>
  );
};

export default OrderDetail;
