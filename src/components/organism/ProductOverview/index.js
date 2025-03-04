import Icons from "@/components/atoms/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductOverview = ({
  title = "Nama Produk",
  description = "Deskripsi produk",
  price = 1000,
  image = "/images/placeholder.webp",
}) => {
  return (
    <>
      <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-10">
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
                <li>
                  <div class="flex items-center">
                    <Icons.Path />

                    <Link
                      href="/products"
                      class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                    >
                      Fashion
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div class="flex items-center">
                    <Icons.Path />

                    <span class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2">
                      {title}
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
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div class="mx-auto max-w-md shrink-0 lg:max-w-lg">
              <Image
                class="w-full dark:hidden"
                src={image}
                alt={title}
                width={200}
                height={200}
              />
              <Image
                class="hidden w-full dark:block"
                src={image}
                alt={title}
                width={200}
                height={200}
              />
            </div>

            <div class="mt-6 sm:mt-8 lg:mt-0">
              <h1 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                {title}
              </h1>
              <div class="mt-4 sm:flex sm:items-center sm:gap-4">
                <p class="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                  {price}
                </p>

                <div class="mt-2 flex items-center gap-2 sm:mt-0">
                  <div class="flex items-center gap-1">
                    <Icons.Star />
                    <Icons.Star />
                    <Icons.Star />
                    <Icons.Star />
                    <Icons.Star />
                  </div>
                  <p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    (5.0)
                  </p>
                  <Link
                    href="#"
                    class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    345 Reviews
                  </Link>
                </div>
              </div>

              <div class="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
                {/* <Link
                  href="#"
                  title=""
                  class="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  role="button"
                >
                  <Icons.Heart />
                  Add to favorites
                </Link> */}

                <Link
                  href="#"
                  title=""
                  class="mt-4 flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                  role="button"
                >
                  <Icons.Cart />
                  Add to cart
                </Link>
              </div>

              <hr class="my-6 border-gray-200 dark:border-gray-800 md:my-8" />

              <p class="mb-6 text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductOverview;
