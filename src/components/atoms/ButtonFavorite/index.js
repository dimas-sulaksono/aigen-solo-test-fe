import React from "react";

const ButtonFavorite = () => {
  return (
    <>
      <button
        type="button"
        data-tooltip-target="tooltip-add-to-favorites-8"
        class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span class="sr-only"> Add to Favorites </span>
        <svg
          class="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
          />
        </svg>
      </button>
      <div
        id="tooltip-add-to-favorites-8"
        role="tooltip"
        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
        data-popper-placement="top"
      >
        Add to favorites
        <div class="tooltip-arrow" data-popper-arrow=""></div>
      </div>
    </>
  );
};

export default ButtonFavorite;
