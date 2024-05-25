import Link from "next/link";
import React from "react";
export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className={"text-4xl font-bold text-blue-primary"}>
              HoomGroom
     </h2>
      <Link href="/login" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-blue-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
        Login
      </Link>
      <Link href="/register" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-blue-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
        Register
      </Link>
     
    </main>
  );
}
