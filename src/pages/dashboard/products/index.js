import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/helper/util/formatCurrency";

const dir = process.env.NEXT_PUBLIC_DIR;

const DashboardProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/product");
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      fetchProducts();
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/api/product/search?name=${value}`,
      );
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`http://localhost:8080/api/product/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <section className="bg-gray-50 py-3 dark:bg-gray-900 sm:py-5">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-x-4 lg:space-y-0">
            <h5>
              <span className="text-gray-500">All Products:</span>
              <span className="dark:text-white">{"products.length"}</span>
            </h5>
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={handleSearch}
              className="rounded-lg border px-4 py-2"
            />
            <Link href="/dashboard/products/add">Add New Product</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <td className="flex items-center px-4 py-2">
                      <Image
                        src={dir + product.imagePath}
                        alt={product.name}
                        width={32}
                        height={32}
                        className="mr-3"
                      />
                      {product.name}
                    </td>
                    <td className="px-4 py-2">{product.category.name}</td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-2 text-right">{product.stock}</td>
                    <td className="px-4 py-2">
                      <button
                        className="min-w-16 rounded-lg bg-red-500 px-2 py-1 text-white"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                      <Link href={`/dashboard/products/update/${product.id}`}>
                        <button className="ml-5 min-w-16 rounded-lg bg-blue-500 px-2 py-1 text-white">
                          Edit
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardProduct;
