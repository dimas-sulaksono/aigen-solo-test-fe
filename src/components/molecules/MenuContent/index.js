import Link from "next/link";
import React from "react";

const MenuContent = () => {
  return (
    <>
      <ul class="hidden items-center justify-start gap-6 py-3 sm:justify-center md:gap-8 lg:flex">
        <li>
          <Link
            href="/"
            title=""
            class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
          >
            Home
          </Link>
        </li>
        <li class="shrink-0">
          <Link
            href="/products"
            title=""
            class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
          >
            Products
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MenuContent;
