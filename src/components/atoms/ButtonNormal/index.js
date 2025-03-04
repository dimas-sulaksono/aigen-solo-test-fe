import Link from "next/link";
import React from "react";

const ButtonNormal = ({ text = "Submit", href = "/" }) => {
  return (
    <Link
      href={href}
      class="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:px-5 lg:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
    >
      {text}
    </Link>
  );
};

export default ButtonNormal;
