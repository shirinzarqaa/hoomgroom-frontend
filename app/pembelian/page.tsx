"use client";

import React, { useState, useEffect } from "react";

export default function Pembayaran() {
    const [selectedPromo, setSelectedPromo] = useState<string | null>(null);

    // Dummy product data
    const product = {
        name: "Product A",
        type: "Type 1",
        originalPrice: 50000,
        discountPrice: 45000, // Set to null if no discount
        stock: "2",
    };

    // Dummy user balance
    const userBalance = 40000; // User's balance

    // Calculate total price
    const totalPrice = (product.discountPrice || product.originalPrice) * parseInt(product.stock);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePayment = () => {
        if (userBalance >= totalPrice) {
            // Proceed with payment
            alert("Payment successful!");
        } else {
            // Open the modal if balance is insufficient
            setIsModalOpen(true);
        }
    };

    const handleSelectPromo = () => {
        // Redirect to promo selection page
        window.location.href = '/kode-promo';
    };

    // Fungsi untuk mengambil kode promo dari URL saat komponen dimuat
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const promoFromUrl = urlParams.get('promo');
        if (promoFromUrl) {
            setSelectedPromo(promoFromUrl);
        }
    }, []);

    return (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4 p-4">
            <div className="text-center mt-20">
                <h1 className="text-2xl font-bold mb-4 text-blue-primary">Pembayaran</h1>
                <div className="text-lg text-blue-primary mb-4 mt-12">
                    <LabelWithValue label="Nama Produk" value={product.name} />
                    <LabelWithValue label="Jenis Produk" value={product.type} />
                    <LabelWithValue label="Harga Asli" value={product.originalPrice.toLocaleString('id-ID')} />
                    {product.discountPrice && (
                        <LabelWithValue label="Harga Setelah Diskon" value={product.discountPrice.toLocaleString('id-ID')} />
                    )}
                    <LabelWithValue label="Jumlah Stok yang Dibeli" value={product.stock} />
                </div>
                <div className="text-lg font-semibold text-blue-primary mb-4 mt-10">
                    <p className="mt-4">{selectedPromo ? `Kode Promo: ${selectedPromo}` : "Belum pilih promo"}</p>
                    <button onClick={handleSelectPromo} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Pilih</button>
                    <p className="mt-10">Total Harga yang Harus Dibayar: Rp. {totalPrice.toLocaleString('id-ID')}</p>
                    <p>Saldo Anda: Rp. {userBalance.toLocaleString('id-ID')}</p>
                </div>
                <div className="text-lg text-red-500 mb-4 mt-10">
                    <p>Saldo anda tidak cukup? topup terlebih dahulu</p>
                    <button onClick={() => window.location.href = '/top-up'} className="bg-green-500 text-white px-4 py-2 rounded-lg mt-6">
                        Topup
                    </button>
                    <button
                        onClick={handlePayment}
                        className={`ml-3 mt-6 bg-blue-primary text-white px-4 py-2 rounded-lg ${userBalance < totalPrice ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={userBalance < totalPrice}
                    >
                        Bayar
                    </button>
                </div>
            </div>
        </section>
    );
}

const LabelWithValue = ({ label, value }: { label: string, value: string }) => (
    <label className="flex flex-col gap-2 items-center">
        <span className="font-semibold">{label}</span>
        <div className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary overflow-hidden">
            {value}
        </div>
    </label>
);