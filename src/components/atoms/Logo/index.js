import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <>
      <div class="shrink-0">
        <Link href="/" title="" class="">
          <Image
            class="block h-8 w-auto dark:hidden"
            src="/images/icons/colaconut.svg"
            alt=""
            width={500}
            height={500}
          />
          <Image
            class="hidden h-8 w-auto dark:block"
            src="/images/icons/colaconut-white.svg"
            alt=""
            width={500}
            height={500}
          />
        </Link>
      </div>
    </>
  );
};

export default Logo;
