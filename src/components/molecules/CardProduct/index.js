import ButtonFavorite from "@/components/atoms/ButtonFavorite";
import ButtonQuickLook from "@/components/atoms/ButtonQuickLook";
import Icons from "@/components/atoms/icons";
import ProductTag from "@/components/atoms/ProductTag";
import { formatCurrency } from "@/helper/util/formatCurrency";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardProduct = ({ id, title, price = 0, image, alt, inStock = true }) => {
  return (
    <>
      <div
        key={id}
        className={`relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${
          !inStock ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 text-lg font-bold text-white">
            Out of Stock
          </div>
        )}

        <div className="h-56 w-full">
          <Link
            href={
              inStock
                ? `/products/${title.toLowerCase().replace(/\s+/g, "-")}`
                : "#"
            }
          >
            <Image
              className="mx-auto aspect-video h-full object-cover dark:hidden"
              src={image}
              alt={alt}
              width={200}
              height={200}
            />
            <Image
              className="mx-auto hidden aspect-video h-full object-cover dark:block"
              src={image}
              alt={alt}
              width={200}
              height={200}
            />
          </Link>
        </div>
        <div className="pt-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              Up to 35% off
            </span>

            <div className="flex items-center justify-end gap-1">
              {/* <ButtonQuickLook /> */}
              {/* <ButtonFavorite /> */}
            </div>
          </div>

          <Link
            href="#"
            className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
          >
            {title}
          </Link>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              <Icons.Star />
              <Icons.Star />
              <Icons.Star />
              <Icons.Star />
              <Icons.Star />
            </div>

            <p className="text-sm font-medium text-gray-900 dark:text-white">
              4.9
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              (4,775)
            </p>
          </div>

          <ul className="mt-2 flex items-center gap-4">
            <ProductTag text="Free Shipping">
              <Icons.DeliveryCar />
            </ProductTag>

            <ProductTag text="Best Price">
              <Icons.Cash />
            </ProductTag>
          </ul>

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
              {formatCurrency(price)}
            </p>

            <button
              type="button"
              disabled={!inStock} // Disable button if out of stock
              className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 ${
                inStock
                  ? "bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  : "cursor-not-allowed bg-gray-400"
              }`}
            >
              <Icons.Cart />
              {inStock ? "Add to cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
