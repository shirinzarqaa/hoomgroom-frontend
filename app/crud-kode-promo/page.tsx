"use client";

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

// Definisi tipe data PromoCode
type PromoCode = {
  id: string;
  name: string;
  description: string;
  discount: number;
  minPurchase: number;
  endDate?: Date | null;
};

function PromoCRUD() {
  const [promoList, setPromoList] = useState<PromoCode[]>([]);
  const [promoName, setPromoName] = useState('');
  const [promoDescription, setPromoDescription] = useState('');
  const [promoDiscount, setPromoDiscount] = useState('');
  const [promoMinPurchase, setPromoMinPurchase] = useState('');
  const [promoEndDate, setPromoEndDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get('id');
    if (idParam) {
      // Lakukan sesuatu, misalnya mengambil data promo dari server menggunakan ID
      console.log('ID promo yang akan diupdate:', idParam);
      // Misalnya, Anda bisa memanggil fungsi untuk mengambil data promo dengan ID tersebut
      // fetchPromoById(idParam);
      // Set nilai editId agar form mengetahui bahwa kita sedang dalam mode pengeditan
      setEditId(idParam);
      // Misalnya, mengisi formulir dengan data promo yang diperbarui
      // fetchPromoData(idParam);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newPromo: PromoCode = {
      id: uuidv4(),
      name: promoName.toUpperCase(),
      description: promoDescription,
      discount: parseFloat(promoDiscount),
      minPurchase: parseFloat(promoMinPurchase),
      endDate: promoEndDate !== '' ? new Date(promoEndDate) : null,
    };
    if (editId) {
      // Lakukan logika untuk update promo dengan editId yang sesuai
      console.log('Melakukan update untuk promo dengan ID:', editId);
      // Misalnya, panggil fungsi untuk melakukan update data promo
      // updatePromoData(editId, newPromo);
    } else {
      // Lakukan logika untuk menambah promo baru
      console.log('Menambah promo baru:', newPromo);
      // Misalnya, panggil fungsi untuk menambah data promo baru
      // addNewPromo(newPromo);
    }
    // Setelah selesai, reset nilai-nilai formulir
    resetForm();
    router.push('/kode-promo-admin');
  };

  // Fungsi untuk mereset nilai-nilai formulir setelah submit
  const resetForm = () => {
    setPromoName('');
    setPromoDescription('');
    setPromoDiscount('');
    setPromoMinPurchase('');
    setPromoEndDate('');
    setEditId(null); // Reset nilai editId agar kembali ke mode penambahan
  };

  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-semibold text-blue-primary mt-20">CRUD Kode Promo</h1>
      <form className="flex flex-col items-center gap-6" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-blue-primary">Nama Kode Promo</span>
          <input
            type="text"
            placeholder="Nama Kode Promo"
            required
            value={promoName}
            pattern="[A-Z0-9]+"
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary"
            onChange={(event) => setPromoName(event.target.value.toUpperCase())}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-blue-primary">Deskripsi</span>
          <textarea
            placeholder="Deskripsi"
            value={promoDescription}
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary"
            onChange={(event) => setPromoDescription(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-blue-primary">Diskon (%)</span>
          <input
            type="number"
            placeholder="Diskon"
            required
            min="0"
            max="100"
            step="0.01"
            value={promoDiscount}
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary"
            onChange={(event) => setPromoDiscount(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-blue-primary">Minimal Pembelian</span>
          <input
            type="number"
            placeholder="Minimal Pembelian"
            required
            min="0"
            step="0.01"
            value={promoMinPurchase}
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary"
            onChange={(event) => setPromoMinPurchase(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold text-blue-primary">Tanggal Berakhir (Opsional)</span>
          <input
            type="date"
            value={promoEndDate}
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary"
            onChange={(event) => setPromoEndDate(event.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={handleSubmit}
          className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-blue-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold text-white"
        >
          {'Tambah'}
        </button>
      </form>
    </section>
  );
}

export default PromoCRUD;
