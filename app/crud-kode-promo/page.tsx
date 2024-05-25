"use client";

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { createPromoCode, getPromoCodeById, updatePromoCode, deletePromoCode} from './api/crud-kodepromo'; // replace with the path to your api.js file

// Definisi tipe data PromoCode
type PromoCode = {
    id: string;
    name: string;
    description: string;
    validDate: string;
    minPurchase: number;
};

function PromoCRUD() {
  const [promoName, setPromoName] = useState('');
  const [promoDescription, setPromoDescription] = useState('');
  const [promoDiscount, setPromoDiscount] = useState('');
  const [promoMinPurchase, setPromoMinPurchase] = useState('');
  const [promoEndDate, setPromoEndDate] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get('id');
    if (idParam) {
      setEditId(idParam);
      fetchPromoData(idParam);
    }
  }, []);

const fetchPromoData = async (id: string) => {
    try {
        const promo = await getPromoCodeById(id);
        if (promo) {
            setPromoName(promo.name);
            setPromoDescription(promo.description);
            setPromoMinPurchase(promo.minPurchase.toString());
            setPromoEndDate(promo.validDate ? new Date(promo.validDate).toISOString().substring(0, 10) : '');
        }
    } catch (error) {
        console.error('Error fetching promo code:', error);
    }
};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newPromo: PromoCode = {
      id: editId || uuidv4(),
      name: promoName.toUpperCase(),
      description: promoDescription,
      validDate: promoEndDate !== '' ? new Date(promoEndDate).toISOString() : '',
      minPurchase: parseFloat(promoMinPurchase),
    };
    try {
      if (editId) {
        await updatePromoCode(editId, newPromo);
        console.log('Promo code updated successfully');
      } else {
        await createPromoCode(newPromo);
        console.log('Promo code created successfully');
      }
      resetForm();
      router.push('/kode-promo-admin');
    } catch (error) {
      console.error('Error saving promo code:', error);
    }
  };

  const resetForm = () => {
    setPromoName('');
    setPromoDescription('');
    setPromoDiscount('');
    setPromoMinPurchase('');
    setPromoEndDate('');
    setEditId(null);
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
          className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-blue-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold text-white"
        >
          {editId ? 'Update' : 'Tambah'}
        </button>
      </form>
    </section>
  );
}

export default PromoCRUD;
