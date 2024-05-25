"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Product {
    productId: string;
    productName: string;
    productDescription: string;
    productImage: string;
    productQuantity: number;
    productPrice: number;
    productDiscountPrice: number;
}

const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:8080/products/AllProduct");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.productId} className="border rounded-lg p-4">
                        <img src={product.productImage} alt={product.productName} className="w-full h-64 object-cover mb-2"/>
                        <h2 className="text-lg font-semibold">{product.productName}</h2>
                        <p className="text-gray-500">{product.productDescription}</p>
                        <p className="text-blue-500 font-bold">{product.productPrice}</p>
                        <div className="mt-2">
                            <Link href={`/update-product/${product.productId}`}>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">Update Produk</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Link href="/create-product">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Tambah Produk</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductListPage;
