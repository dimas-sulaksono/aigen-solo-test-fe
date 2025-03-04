import Link from "next/link";
import React from "react";

const MyCart = () => {
  return (
    <>
      <button
        id="myCartDropdownButton1"
        data-dropdown-toggle="myCartDropdown1"
        type="button"
        class="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <span class="sr-only">Cart</span>
        <svg
          class="h-5 w-5 lg:me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
          />
        </svg>
        <span class="hidden sm:flex">My Cart</span>
        <svg
          class="ms-1 hidden h-4 w-4 text-gray-900 dark:text-white sm:flex"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      <div
        id="myCartDropdown1"
        class="z-10 mx-auto hidden max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800"
      >
        <div class="grid grid-cols-2">
          <div>
            <Link
              href="#"
              class="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white"
            >
              Apple iMac 20&quot;
            </Link>
            <p class="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
              $8,997
            </p>
          </div>

          <div class="flex items-center justify-end gap-6">
            <p class="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
              Qty: 3
            </p>

            <button
              data-tooltip-target="tooltipRemoveItem5b"
              type="button"
              class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
            >
              <span class="sr-only"> Remove </span>
              <svg
                class="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              id="tooltipRemoveItem5b"
              role="tooltip"
              class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
            >
              Remove item
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>

        <Link
          href="#"
          title=""
          class="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          role="button"
        >
          {" "}
          Proceed to Checkout{" "}
        </Link>
      </div>
    </>
  );
};

export default MyCart;
