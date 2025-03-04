import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ title, children, type = "login" }) => {
  return (
    <>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <Link
            href="/"
            class="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image
              class="mr-2"
              src="/images/icons/colaconut.svg"
              alt="logo"
              width={200}
              height={200}
            />
          </Link>
          <div class="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                {title}
              </h1>
              {children}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {type === "register"
                  ? "Already have an account? "
                  : "Don't have an account yet? "}
                <span className="text-green-primary cursor-pointer underline-offset-2 hover:opacity-70">
                  {type === "register" && (
                    <Link
                      href="/login"
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign in
                    </Link>
                  )}
                  {type === "login" && (
                    <Link
                      href="/register"
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthLayout;
