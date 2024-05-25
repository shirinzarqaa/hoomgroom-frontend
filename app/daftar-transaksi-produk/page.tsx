"use client";

import React from "react";
import Link from "next/link";

type TransactionData = {
    id: string;
    productName: string;
    type: string;
    totalPrice: number;
    stock: number;
};

// Dummy transaction data
const dummyTransactionData: TransactionData[] = [
    {
        id: "1",
        productName: "Product A",
        type: "Type 1",
        totalPrice: 50000,
        stock: 2,
    },
    {
        id: "2",
        productName: "Product B",
        type: "Type 2",
        totalPrice: 75000,
        stock: 1,
    },
    {
        id: "3",
        productName: "Product C",
        type: "Type 3",
        totalPrice: 100000,
        stock: 3,
    },
];

const TransactionCard = ({ transaction }: { transaction: TransactionData }) => {
    return (
        <div className="border-2 border-blue-primary rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-blue-primary">{transaction.productName}</h2>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Jenis Produk: {transaction.type}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Total Pembayaran: Rp. {transaction.totalPrice.toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Stok Produk yang Dibeli: {transaction.stock}</p>
        </div>
    );
};

export default function TransactionPage() {

    return (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-blue-primary">Daftar Transaksi</h1>
                <p className="text-lg text-blue-primary">
                    Berikut Transaksi yang selama ini sudah anda lakukan
                </p>
            </div>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4 text-center">Daftar Transaksi</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {dummyTransactionData.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </section>
    );
}
