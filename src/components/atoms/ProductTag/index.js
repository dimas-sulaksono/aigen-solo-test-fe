import React from "react";

const ProductTag = ({ children, text }) => {
  return (
    <>
      <li class="flex items-center gap-2">
        {children}
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
          {text}
        </p>
      </li>
    </>
  );
};

export default ProductTag;
