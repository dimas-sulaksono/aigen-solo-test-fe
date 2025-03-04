import React from "react";

const ButtonAuth = ({ text }) => {
  return (
    <>
      <button
        type="submit"
        class="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        {text}
      </button>
    </>
  );
};

export default ButtonAuth;
