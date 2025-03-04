import React, { useState } from "react";
import DarkModeToggle from "../DarkModeToggle";
import Link from "next/link";
import { useRouter } from "next/router";

const ButtonAccount = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("hasReloaded");

    if (router.pathname != "/login") {
      router.push("/login");
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <>
      <button
        id="userDropdownButton1"
        data-dropdown-toggle="userDropdown1"
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        class="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <svg
          class="me-1 h-5 w-5"
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
            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        Account
        <svg
          class="ms-1 h-4 w-4 text-gray-900 dark:text-white"
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
        id="userDropdown1"
        className={`absolute top-20 z-10 w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700 ${
          isDropdownOpen
            ? "block overflow-y-auto antialiased"
            : "hidden overflow-hidden"
        }`}
      >
        <ul class="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
          <li>
            <Link
              href="#"
              title=""
              class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {" "}
              My Account{" "}
            </Link>
          </li>
          <li>
            <a
              href="#"
              title=""
              class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {" "}
              My Orders{" "}
            </a>
          </li>
          <li>
            <Link
              href="#"
              title=""
              class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {" "}
              Settings{" "}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              title=""
              class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {" "}
              Favourites{" "}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              title=""
              class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {" "}
              Delivery Addresses{" "}
            </Link>
          </li>
          <li>
            <Link
              href="#"
              title=""
              class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              {" "}
              Billing Data{" "}
            </Link>
          </li>
        </ul>

        <div class="p-2 text-sm font-medium text-gray-900 dark:text-white">
          <Link href="#">
            <DarkModeToggle />
          </Link>
          <button
            href="#"
            title=""
            onClick={handleLogout}
            class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {" "}
            Sign Out{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default ButtonAccount;
