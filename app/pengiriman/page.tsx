'use client';

import React, { useState } from 'react';

interface Product {
  name: string;
  price: number;
  status: string;
  transport: string;
}

const products: Product[] = [
  { name: 'Product A', price: 100, status: 'MENUNGGU_VERIFIKASI', transport: '' },
  { name: 'Product B', price: 200, status: 'MENUNGGU_VERIFIKASI', transport: '' },
  { name: 'Product C', price: 300, status: 'MENUNGGU_VERIFIKASI', transport: '' },
];

const App = () => {
  const [productsState, setProductsState] = useState(products);

  const handleStatusChange = (index: number, status: string) => {
    const newProducts = [...productsState];
    newProducts[index].status = status;
    setProductsState(newProducts);
  };

  const handleTransportChange = (index: number, transport: string) => {
    const newProducts = [...productsState];
    newProducts[index].transport = transport;
    setProductsState(newProducts);
  };

  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8 p-4 pt-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-primary">Pengiriman Produk</h1>
        <div className="flex flex-row items-center justify-center gap-8 p-4 pt-6">
            {productsState.map((product, index) => (
            <div key={product.name} className="flex-1 bg-white p-4 rounded shadow-md shadow-lg mb-8 border border-gray-200 border-width-1rem">
            <h2 className="text-lg font-bold text-black">{product.name}</h2>
            <p className="text-gray-800">{product.price}</p>
            <div className="relative mb-4">
                <select
                value={product.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="block w-full pl-10 text-sm text-gray-800"
                >
                <option value="MENUNGGU_VERIFIKASI">MENUNGGU_VERIFIKASI</option>
                <option value="DIPROSES" disabled={product.status !== 'MENUNGGU_VERIFIKASI'}>
                    Diproses
                </option>
                <option value="DIKIRIM" disabled={product.status !== 'DIPROSES'}>
                    Dikirim
                </option>
                <option value="TIBA" disabled={product.status !== 'DIKIRIM'}>
                    Tiba
                </option>
                <option value="SELESAI" disabled={product.status !== 'TIBA'}>
                    Selesai
                </option>
                </select>
            </div>
            {product.status === 'DIKIRIM' && (
                <div className="relative">
                <select
                    value={product.transport}
                    onChange={(e) => handleTransportChange(index, e.target.value)}
                    className="block w-full pl-10 text-sm text-gray-800"
                >
                    <option value="">Pilih Transportasi</option>
                    <option value="JNE">JNE</option>
                    <option value="J&T">J&T</option>
                    <option value="SiCepat">SiCepat</option>
                </select>
                </div>
                )}
            </div>
            ))}
        </div>
    </section>
  );
};

export default App;