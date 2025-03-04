import Image from "next/image";
import React from "react";

const EyeSlash = () => {
  return (
    <>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
        <Image
          src="/images/icons/eye-slash.svg"
          alt="hide"
          className="h-6 w-6"
          width={24}
          height={24}
        />
      </div>
    </>
  );
};
export default EyeSlash;
