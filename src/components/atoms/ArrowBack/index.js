import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArrowBack = () => {
  return (
    <>
      <div className="relative max-w-max pt-8 lg:hidden">
        <Link href="/">
          <Image
            src="/images/icons/arrow-bold.svg"
            alt="back"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </>
  );
};

export default ArrowBack;
