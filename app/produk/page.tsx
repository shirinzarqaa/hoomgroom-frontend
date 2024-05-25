"use client";

import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    // Load produk dari database atau API
    const initialProducts: Product[] = [
      { id: 1, name: 'Produk 1', description: 'Deskripsi produk 1', price: 100 },
      { id: 2, name: 'Produk 2', description: 'Deskripsi produk 2', price: 200 },
      { id: 3, name: 'Produk 3', description: 'Deskripsi produk 3', price: 300 },
    ];
    setProducts(initialProducts);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newProductData: Product = {
      id: products.length + 1,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
    };
    setProducts([...products, newProductData]);
    setNewProduct({ id: 0, name: '', description: '', price: 0 });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Produk</h1>
      <div className="flex flex-wrap justify-center">
        {products.map((product, index) => (
          <div key={index} className="w-full md:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white shadow-md rounded p-4">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold">Rp {product.price}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(product.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => console.log('Tambah produk baru')}
      >
        Tambah produk baru
      </button>
      <form onSubmit={handleSubmit} className="mt-4">
        <label>
          Nama produk:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        <br />
        <label>
          Deskripsi produk:
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        <br />
        <label>
          Harga produk:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </label>
        <br />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Daftarkan produk
        </button>
      </form>
    </div>
  );
};

export default App;