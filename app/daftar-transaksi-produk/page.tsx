"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type TransactionData = {
    transactionId: string;
    userId: number;
    productId: string;
    productAmount: number;
    paymentDate: string;
    totalPrice: number;
};

const TransactionCard = ({ transaction }: { transaction: TransactionData }) => {
    return (
        <div className="border-2 border-blue-primary rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-blue-primary">Product ID: {transaction.productId}</h2>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">User ID: {transaction.userId}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Jumlah Produk: {transaction.productAmount}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Total Pembayaran: Rp. {transaction.totalPrice.toLocaleString('id-ID')}</p>
            <p className="text-sm text-gray-600 mb-2 text-blue-primary">Tanggal Pembayaran: {new Date(transaction.paymentDate).toLocaleDateString('id-ID')}</p>
        </div>
    );
};

export default function TransactionPage() {
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("http://34.69.235.240/api/transactions/list")
            .then((response) => {
                const transactionsData: TransactionData[] = response.data.map((transaction: any) => ({
                    transactionId: transaction.transactionId,
                    userId: transaction.userId,
                    productId: transaction.productId,
                    productAmount: transaction.productAmount,
                    paymentDate: transaction.paymentDate,
                    totalPrice: transaction.totalPrice,
                }));
                setTransactions(transactionsData);
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch transactions");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

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
                    {transactions.map((transaction) => (
                        <TransactionCard key={transaction.transactionId} transaction={transaction} />
                    ))}
                </div>
            </div>
        </section>
    );
}
