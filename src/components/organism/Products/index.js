import React, { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "@/services/products";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useRouter } from "next/router";
import Link from "next/link";
import Icons from "@/components/atoms/icons";
import DropdownSort from "@/components/molecules/DropdownSort";
import CardProduct from "@/components/molecules/CardProduct";
import FilterModal from "../FilterModal";
import ButtonFilter from "@/components/atoms/ButtonFilter";

const dir = process.env.NEXT_PUBLIC_DIR;

const Products = () => {
  const [products, setProducts] = useState([]); // produk yang ditampilin
  const [allProducts, setAllProducts] = useState([]); // semua produk bakal disimpen di sini
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); // produk yang ditampilin pertama kali
  const { topRef, scrollToTop } = useScrollToTop(); // custom hooks
  const router = useRouter();

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      router.replace(router.asPath); // Reload tanpa hard refresh
    }
  }, [router]);

  // const isLoading = useSessionCheck();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data); // nyimpen semua data di state
        setProducts(data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // buat nampilin lebih banyak produk
  const showMoreProducts = useCallback(() => {
    const newVisibleCount = visibleCount + 4; //
    setVisibleCount(newVisibleCount);
    setProducts(allProducts.slice(0, newVisibleCount));
  }, [visibleCount, allProducts]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
            <div ref={topRef}></div>
            <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
              {/* <!-- Heading & Filters --> */}
              <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
                <div>
                  <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                      <li class="inline-flex items-center">
                        <Link
                          href="/products"
                          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                        >
                          <Icons.Home />
                          Home
                        </Link>
                      </li>
                      <li>
                        <div class="flex items-center">
                          <Icons.Path />

                          <Link
                            href="/products"
                            class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                          >
                            Products
                          </Link>
                        </div>
                      </li>
                      <li aria-current="page">
                        <div class="flex items-center">
                          <Icons.Path />

                          <span class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                            Fashion
                          </span>
                        </div>
                      </li>
                    </ol>
                  </nav>

                  {/* CATEGORY TITLE */}
                  <h2 class="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Fashion
                  </h2>
                </div>
                <ButtonFilter />
              </div>
              <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {/* PRODUCT CARD */}
                {products.map((product) => (
                  <CardProduct
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    image={dir + product.imagePath}
                    alt={product.name}
                    price={product.price}
                    inStock={product.status}
                  />
                ))}
              </div>
              <div class="w-full text-center">
                {visibleCount < allProducts.length && (
                  <button
                    type="button"
                    onClick={showMoreProducts}
                    class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    Show more
                  </button>
                )}
              </div>
            </div>

            {/* <!-- FILTER MODAL --> */}
            <FilterModal />
          </section>

          {/* tombol scroll to top */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 z-50 cursor-pointer rounded-md bg-primary-700 px-3 py-2 text-sm text-white"
          >
            Scroll to Top
          </button>
        </>
      )}
    </>
  );
};

export default Products;
