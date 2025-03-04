import React from "react";

const ButtonQuickLook = () => {
  return (
    <>
      <button
        type="button"
        data-tooltip-target="tooltip-quick-look-8"
        class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span class="sr-only"> Quick look </span>
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
            stroke-width="2"
            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
          />
          <path
            stroke="currentColor"
            stroke-width="2"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>
      <div
        id="tooltip-quick-look-8"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        data-popper-placement="top"
      >
        Quick look
        <div class="tooltip-arrow" data-popper-arrow=""></div>
      </div>
    </>
  );
};

export default ButtonQuickLook;
