"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type PromoData = {
    id: string;
    name: string;
    description: string;
    minPurchase: number;
    expiryDate: string;
};

const dummyPromoData: PromoData[] = [
    {
        id: "1",
        name: "BELANJAHEMAT20",
        description: "Diskon 20% untuk total pembelian.",
        minPurchase: 50000,
        expiryDate: "2024-06-30",
    },
    {
        id: "2",
        name: "RAMADHANSALE",
        description: "Diskon khusus menyambut bulan Ramadhan.",
        minPurchase: 100000,
        expiryDate: "2024-07-10",
    },
    {
        id: "3",
        name: "JULYDISCOUNT",
        description: "Diskon spesial untuk bulan Juli.",
        minPurchase: 75000,
        expiryDate: "2024-07-31",
    }
];

const PromoCard = ({ promo }: { promo: PromoData }) => {
    return (
        <div className="border-2 border-blue-primary rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2 text-blue-primary">{promo.name}</h2>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">{promo.description}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Minimal Pembelian: Rp. {promo.minPurchase.toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Berakhir pada: {promo.expiryDate}</p>
            <Link href={`/crud-kode-promo?id=${promo.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Update</button>
            </Link>
            <Link href={`/crud-kode-promo?id=${promo.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Delete</button>
            </Link>
        </div>
    );
};

export default function KodePromoPage() {

    return (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-blue-primary">Daftar Kode Promo</h1>
                <p className="text-lg text-blue-primary">
                    Pilih kode promo yang anda inginkan
                </p>
            </div>
            <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dummyPromoData.map((promo) => (
                    <PromoCard key={promo.id} promo={promo} />
                ))}
            </div>
        </div>
        </section>
    );
}
