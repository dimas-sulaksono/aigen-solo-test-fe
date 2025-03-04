import React from "react";

const InputForm = ({
  name,
  text,
  type = "text",
  placeholder,
  onChange = null,
}) => {
  return (
    <>
      <div>
        <label
          for={name}
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {text}
        </label>

        <input
          type={type}
          id={name}
          name={name}
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={placeholder}
          onChange={onChange}
          required="true"
        />
      </div>
    </>
  );
};

export default InputForm;
