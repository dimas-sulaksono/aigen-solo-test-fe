import ButtonNormal from "@/components/atoms/ButtonNormal";
import React, { useEffect, useState } from "react";
import ButtonAccount from "@/components/atoms/ButtonAccount";
import MyCart from "@/components/molecules/MyCart";
import ButtonBurger from "@/components/atoms/ButtonBurger";
import MenuContentButtonBurger from "@/components/atoms/MenuContentButtonBurger";
import MenuContent from "@/components/molecules/MenuContent";
import Logo from "@/components/atoms/Logo";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
  }, []);

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      const cartButton = document.getElementById("myCartDropdownButton1");
      if (cartButton) {
        cartButton.click(); // Klik otomatis saat halaman selesai dimuat
      }
    });
  }, []);

  return (
    <>
      <nav class="bg-white antialiased dark:bg-gray-800">
        <div class="mx-auto max-w-screen-xl px-4 py-4 2xl:px-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-8">
              <Logo />

              <MenuContent />
              {/* <p>halo={isLoggedIn}</p> */}
              {/* <p>halo2={localStorage.getItem("isLoggedIn")}</p> */}
            </div>

            <div class="flex items-center lg:space-x-2">
              {isLoggedIn != null ? (
                <>
                  <MyCart />
                  <ButtonAccount />
                </>
              ) : (
                <ButtonNormal text="Login" href="/login" />
              )}

              <ButtonBurger />
            </div>
          </div>
          <MenuContentButtonBurger />
        </div>
      </nav>
    </>
  );
};

export default Nav;
