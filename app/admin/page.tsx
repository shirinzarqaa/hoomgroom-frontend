import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className={"text-4xl font-bold text-blue-primary"}>
              HoomGroom
     </h2>
      <Link href="/pengiriman" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-blue-primary w-36 justify-center flex rounded-lg py-1.5 font-semibold">
        Atur pengiriman
      </Link>
      <Link href="/produk" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-blue-primary w-36 justify-center flex rounded-lg py-1.5 font-semibold">
        Atur produk
      </Link>
     
    </main>
  );
}
