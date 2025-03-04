import Icons from "@/components/atoms/icons";
import Image from "next/image";
import React from "react";

const CartAd = () => {
  return (
    <>
      <div class="hidden xl:mt-8 xl:block">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
          People also bought
        </h3>
        <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
          <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <a href="#" class="overflow-hidden rounded">
              <Image
                class="mx-auto h-44 w-44 dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt="imac image"
                width={500}
                height={500}
              />
              <Image
                class="mx-auto hidden h-44 w-44 dark:block"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                alt="imac image"
                width={500}
                height={500}
              />
            </a>
            <div>
              <a
                href="#"
                class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
              >
                iMac 27”
              </a>
              <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                This generation has some improvements, including a longer
                continuous battery life.
              </p>
            </div>
            <div>
              <p class="text-lg font-bold text-gray-900 dark:text-white">
                <span class="line-through"> $399,99 </span>
              </p>
              <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                $299
              </p>
            </div>
            <div class="mt-6 flex items-center gap-2.5">
              <button
                data-tooltip-target="favourites-tooltip-1"
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <Icons.Heart className="h-5 w-5" />
              </button>
              <div
                id="favourites-tooltip-1"
                role="tooltip"
                class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              >
                Add to favourites
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
              <button
                type="button"
                class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <Icons.Cart />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartAd;
