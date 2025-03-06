import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuthGuard from "@/hooks/useAuthGuard";

const api = process.env.NEXT_PUBLIC_API;

const ProductUpdate = () => {
  const { loading, isAuthorized } = useAuthGuard();
  const router = useRouter();
  const { id } = router.query;

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthorized && id) {
      fetchCategories();
      fetchProductDetails();
    }
  }, [isAuthorized, id]); // Pastikan fetch dilakukan hanya setelah `id` tersedia

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${api}/category`);
      const data = await res.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`${api}/product/id/${id}`);
      const data = await res.json();
      if (data.status === 200) {
        setProduct(data.data);
        setName(data.data.name);
        setDescription(data.data.description);
        setPrice(data.data.price);
        setStock(data.data.stock);
        setCategory(data.data.category.id);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("categoryId", category);
      if (image) {
        formData.append("imagePath", image);
      }

      const res = await fetch(`${api}/product/${id}`, {
        method: "PUT",
        body: formData,
      });
      const result = await res.json();

      if (result.status === 200) {
        router.push("/dashboard/products");
      } else {
        console.error("Error updating product:", result);
      }
    } catch (error) {
      setError("Gagal mengupdate produk.");
    }
  };

  if (loading) return <p>Checking access...</p>;
  if (!isAuthorized) return null;
  if (!id || !product) return <p>Loading...</p>;

  return (
    <section className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded border p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full rounded border p-2"
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full rounded border p-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="w-full rounded border p-2"
        />
        <select
          name="categoryId"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full rounded border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full rounded border p-2"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Update Product
        </button>
      </form>
    </section>
  );
};

export default ProductUpdate;
