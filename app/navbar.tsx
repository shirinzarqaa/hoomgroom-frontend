"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLoggedIn, logout, getUser } from "./utils/authUtils";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <li className={`${isActive ? "active" : ""}`}>
      <a className={`transition-all px-3 py-1 rounded-full ${isActive ? "active font-bold text-white bg-blue-primary hover:opacity-70" : "hover:text-blue-primary"} `} href={href}>
        {children}
      </a>
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  function handleLogout() {
    logout();
    alert("Logout berhasil")
  }
  useEffect(() => {
    const checkLoggedIn = async () => {
      const result = await isLoggedIn();
      const admin = await getUser();
      setLoggedIn(result);
      setIsAdmin(admin);

      console.log(admin);
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const result = await isLoggedIn();
      setLoggedIn(result);
    };

    checkLoggedIn();
  }, []);

  return (
    <nav className="flex gap-16 px-8 py-4 items-center bg-primary fixed w-full left-0">
      <a className="font-semibold text-2xl text-blue-primary" href="/">Hoomgroom</a>
      {isLoaded && loggedIn && ( // Perbarui kondisi di sini
        <div className="mr-4 text-blue-primary">Welcome, {getUser()}</div>
      )}
      {isLoaded &&
        <>
          {!loggedIn ?
            <div className="justify-between flex w-full">
              <div>
                <ul className="flex gap-4 text-blue-primary">
                  <NavLink href="/melihat-semua-product" isActive={pathname === "/trailer"}>
                    Daftar Product
                  </NavLink>

                </ul>
              </div>
            </div>
            :
            <div className="justify-between flex w-full">
              <div>
                <ul className="flex gap-4 text-blue-primary">
                  {isAdmin === "" && (
                    <>
                      <NavLink href="/melihat-semua-produk" isActive={pathname === "/melihat-semua-produk"}>
                        Daftar Product
                      </NavLink>
                      <NavLink href="/daftar-transaksi-produk" isActive={pathname === "/daftar-transaksi-produk"}>
                        Daftar Transaksi Produk
                      </NavLink>
                      <NavLink href="/pembelian" isActive={pathname === "/pembelian"}>
                        Pembelian

                      </NavLink>

                    </>
                  )}
                  {isAdmin === "Admin" && (
                    <>
                      <NavLink href="/admin" isActive={pathname === "/admin"}>
                        Dashboard Admin
                      </NavLink>
                      <NavLink href="/crud-produk" isActive={pathname === "/admin"}>
                        Penambahan Produk
                      </NavLink>
                      <NavLink href="/crud-kode-promo" isActive={pathname === "/admin"}>
                        Penambahan Kode Promo
                      </NavLink>
                      <NavLink href="/pengiriman-produk" isActive={pathname === "/admin"}>
                        Pengiriman Produk
                      </NavLink>
                    </>
                  )}
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