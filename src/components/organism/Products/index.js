import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Icons from "@/components/atoms/icons";
import DropdownSort from "@/components/molecules/DropdownSort";
import CardProduct from "@/components/molecules/CardProduct";
import FilterModal from "../FilterModal";
import ButtonFilter from "@/components/atoms/ButtonFilter";

const dir = process.env.NEXT_PUBLIC_DIR;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("fashion");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/category");
        const result = await res.json(); // Simpan respons di 'result'

        console.log("Fetched categories:", result); // Debugging

        if (Array.isArray(result.data)) {
          setCategories(result.data); // Ambil kategori dari 'data'
        } else {
          console.error("Categories API did not return an array:", result);
          setCategories([]); // Pastikan tidak error saat render
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Pastikan tidak error saat render
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8080/api/product/category?categoryName=${selectedCategory}&page=0&size=10`,
        );
        const data = await res.json();
        setProducts(data.content);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <section className="bg-gray-50 py-8 dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 flex items-center justify-between md:mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              {selectedCategory.charAt(0).toUpperCase() +
                selectedCategory.slice(1)}
            </h2>
          </div>

          {/* Dropdown untuk kategori */}
          <select
            className="rounded-md border border-gray-300 p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
        </div>

        {/* Produk */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => (
              <CardProduct
                key={product.id}
                id={product.id}
                title={product.name}
                image={dir + product.imagePath}
                alt={product.name}
                price={product.price}
                inStock={product.status}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
