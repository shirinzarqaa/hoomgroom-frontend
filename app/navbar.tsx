"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <li className={`${isActive ? "active" : "" }`}>
      <a className={`transition-all px-3 py-1 rounded-full ${isActive ? "active font-bold text-white bg-blue-primary hover:opacity-70" : "hover:text-blue-primary"} `} href={href}>
        {children}
      </a>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isAuthenticated = true;

  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  function handleLogout() {
    // logout();
    // alert("Logout berhasil")
  }

  return (
    <nav className="flex gap-16 px-8 py-4 items-center bg-primary fixed w-full left-0">
      <a className="font-semibold text-2xl text-blue-primary" href="/">Hoomgroom</a>
      {isLoaded &&
        <>
          {!isAuthenticated ? 
            <div className="justify-between flex w-full">
              <div>
                <ul className="flex gap-4 text-blue-primary">
                  <NavLink href="/trailer" isActive={pathname === "/trailer"}>
                    Daftar Product
                  </NavLink>
                  
                </ul>
              </div>
            </div>
          :
            <div className="justify-between flex w-full">
              <div>
                <ul className="flex gap-4 text-blue-primary">
                  <NavLink href="/daftar-product" isActive={pathname === "/daftar-product"}>
                    Daftar Product
                  </NavLink>
                  <NavLink href="/daftar-transaksi-produk" isActive={pathname === "/daftar-transaksi-produk"}>
                    Daftar Transaksi Produk
                  </NavLink>
                </ul>
              </div>
              <div className="border-2 text-blue-primary border-blue-primary px-4 rounded-full hover:cursor-pointer transition-all hover:scale-110 hover:bg-blue-primary active:scale-95 active:brightness-75" onClick={handleLogout}>
                Logout
              </div>
            </div>
          }
        </>
      }
      </nav>
  );
}