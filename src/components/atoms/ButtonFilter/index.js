import React, { useState } from "react";
import Icons from "@/components/atoms/icons";
import DropdownSort from "@/components/molecules/DropdownSort";

const ButtonFilter = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div class="flex items-center space-x-4">
        <button
          data-modal-toggle="filterModal"
          data-modal-target="filterModal"
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
        >
          <Icons.Filter />
          Filters
          <Icons.Dropdown />
        </button>
        <button
          id="sortDropdownButton1"
          data-dropdown-toggle="dropdownSort1"
          type="button"
          class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto"
        >
          <Icons.Sort />
          Sort
          <Icons.Dropdown />
        </button>
        <DropdownSort />
      </div>
    </>
  );
};

export default ButtonFilter;
