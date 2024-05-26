"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { insertTopUp } from './api/top-up'; // Adjust the import path to match your project structure


export default function Homepage() {
    const [selectedSaldo, setSelectedSaldo] = useState<number | null>(null);
    const router = useRouter();

    const handleButtonClick = (amount: number | null) => {
        setSelectedSaldo(amount);
    };

    const handleUpdateSaldo = () => {
        if (selectedSaldo !== null) {
            router.push('/pembelian');
        } else {
            alert('Pilih nominal saldo terlebih dahulu.');
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; target: { username: { value: string; }; amount: { value: string; }; }; }) => {
        event.preventDefault();
    
        const data = {
          username: event.target.username.value,
          timestamp: new Date().toISOString(),
          amount: parseFloat(event.target.amount.value),
        };
    
        try {
          const userDetails = await insertTopUp(data);
    
          // Handle the response here. For example, you might want to redirect
          // the user to a different page or update the state of your component.
          console.log(userDetails);
        } catch (error) {
          // Handle the error here. For example, you might want to display
          // an error message to the user.
          console.error(error);
        }
      };

    return (
        <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4 text-blue-primary">TopUp Saldo</h1>
                <p className="text-lg text-blue-primary">
                    Pilih nominal jumlah saldo yang ingin anda topup
                </p>
            </div>
            <div className="flex gap-4">
                <button onClick={() => handleButtonClick(10000.0)} className="bg-blue-primary text-white px-4 py-2 rounded-lg">10.000</button>
                <button onClick={() => handleButtonClick(25000.0)} className="bg-blue-primary text-white px-4 py-2 rounded-lg">25.000</button>
                <button onClick={() => handleButtonClick(50000.0)} className="bg-blue-primary text-white px-4 py-2 rounded-lg">50.000</button>
                <button onClick={() => handleButtonClick(100000.0)} className="bg-blue-primary text-white px-4 py-2 rounded-lg">100.000</button>
            </div>
            {selectedSaldo && (
                <div className="mt-4 text-lg text-blue-primary">
                    Saldo yang di topup sebesar Rp. {selectedSaldo.toLocaleString('id-ID')}
                </div>
            )}
            <button onClick={handleUpdateSaldo} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
                Update Saldo
            </button>
        </section>
    );
}
