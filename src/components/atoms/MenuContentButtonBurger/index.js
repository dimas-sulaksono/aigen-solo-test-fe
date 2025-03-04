import Link from "next/link";
import React from "react";

const MenuContentButtonBurger = () => {
  return (
    <>
      <div
        id="ecommerce-navbar-menu-1"
        class="mt-4 hidden rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-700"
      >
        <ul class="space-y-3 text-sm font-medium text-gray-900 dark:text-white">
          <li>
            <Link
              href="#"
              class="hover:text-primary-700 dark:hover:text-primary-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#"
              class="hover:text-primary-700 dark:hover:text-primary-500"
            >
              Best Sellers
            </Link>
          </li>
          <li>
            <Link
              href="#"
              class="hover:text-primary-700 dark:hover:text-primary-500"
            >
              Gift Ideas
            </Link>
          </li>
          <li>
            <Link
              href="#"
              class="hover:text-primary-700 dark:hover:text-primary-500"
            >
              Games
            </Link>
          </li>
          <li>
            <Link
              href="#"
              class="hover:text-primary-700 dark:hover:text-primary-500"
            >
              Electronics
            </Link>
          </li>
          <li>
            <Link
              href="#"
              class="hover:text-primary-700 dark:hover:text-primary-500"
            >
              Home & Garden
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuContentButtonBurger;
