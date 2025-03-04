import NavMenu from "@/components/atoms/NavMenu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NavMenuBurger = () => {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    sessionStorage.removeItem("isLoggedIn");
    router.push("/login");
    window.location.href = "/login";
  }
  return <></>;
};

export default NavMenuBurger;
