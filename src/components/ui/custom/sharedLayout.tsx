"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "./header";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
console.log("coming to here...")
  const pathName = usePathname();
  const nonLayoutRoutes = ["/login", "/register"];
  const shouldRenderLayout = !nonLayoutRoutes.includes(pathName);
  return (
    <main>
      {shouldRenderLayout ? (
        <>
          <Header />
          <main>{children}</main>
        </>
      ) : (
        <main>{children}</main>
      )}
    </main>
  );
}