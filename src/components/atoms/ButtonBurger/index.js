import React from "react";

const ButtonBurger = () => {
  return (
    <>
      <button
        type="button"
        data-collapse-toggle="ecommerce-navbar-menu-1"
        aria-controls="ecommerce-navbar-menu-1"
        aria-expanded="false"
        class="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 lg:hidden"
      >
        <span class="sr-only">Open Menu</span>
        <svg
          class="h-5 w-5"
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
            stroke-width="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
      </button>
    </>
  );
};

export default ButtonBurger;
