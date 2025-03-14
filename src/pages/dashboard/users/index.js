"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import useAuthGuard from "@/hooks/useAuthGuard";

const api = process.env.NEXT_PUBLIC_API + "/user";

export default function UserDashboard() {
  const { loading, isAuthorized } = useAuthGuard();
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (isAuthorized) fetchUsers();
  }, [isAuthorized, roleFilter, page]);

  const fetchUsers = async () => {
    setDataLoading(true);
    try {
      let url = `${api}?page=${page}&size=5`;
      if (roleFilter) {
        url = `${api}/search?role=${roleFilter}&page=${page}&size=5`;
      }
      const response = await axios.get(url);
      setUsers(response.data.data);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setDataLoading(false);
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`${api}/update/${userId}`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading || dataLoading) return <p>Loading...</p>;
  if (!isAuthorized) return null;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">User Dashboard</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Role:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="ADMIN">ADMIN</option>
          <option value="CUSTOMER">CUSTOMER</option>
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uuid} className="border">
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <select
                  value={user.role}
                  onChange={(e) => updateUserRole(user.uuid, e.target.value)}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="CUSTOMER">CUSTOMER</option>
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="bg-red-500 p-1 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="mr-2 bg-gray-300 p-2"
        >
          Prev
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="ml-2 bg-gray-300 p-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
