import { useEffect } from "react";
import { useRouter } from "next/router";
import "flowbite";
import "@/styles/globals.css";
import Nav from "@/components/organism/Nav";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    require("flowbite");
  }, []);

  // Jangan tampilkan Navbar di halaman tertentu
  const excludedRoutes = ["/login", "/register"];
  const showNav = !excludedRoutes.includes(router.pathname);

  return (
    <>
      {showNav && <Nav />}
      <Component {...pageProps} />
    </>
  );
}
