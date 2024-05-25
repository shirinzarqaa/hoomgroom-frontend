"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPromoCodes, deletePromoCode } from './api/kode-promo'; // replace with the path to your api.js file


type PromoData = {
    id: string;
    name: string;
    description: string;
    minPurchase: number;
    validDate: string;
};

const handleDelete = async (id: string) => {
    try {
        // Call your delete API endpoint here
        await deletePromoCode(id);
        console.log(`Deleting promo with ID: ${id}`);
        // Refresh the promo codes after deleting
        window.location.reload();
    } catch (error) {
        console.error('Error deleting promo code:', error);
    }
};

const PromoCard = ({ promo }: { promo: PromoData }) => {
    return (
        <div className="border-2 border-blue-primary rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-2 text-blue-primary">{promo.name}</h2>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">{promo.description}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Minimal Pembelian: Rp. {promo.minPurchase.toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Berakhir pada: {promo.validDate}</p>
            <Link href={`/crud-kode-promo?id=${promo.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Update</button>
            </Link>
            <button onClick={() => handleDelete(promo.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 ml-6">Delete</button>
        </div>
    );
};


export default function KodePromoPage() {
    const [promoCodes, setPromoCodes] = useState<PromoData[]>([]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllPromoCodes();
                console.log(data)
                setPromoCodes(data);
            } catch (error) {
                console.error('Error fetching promo codes:', error);
            }
        };

        fetchProducts();
    }, []);


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
                    {promoCodes.map((promo) => (
                        <PromoCard key={promo.id} promo={promo} />
                    ))}
                </div>
            </div>
        </section>
    );
}
