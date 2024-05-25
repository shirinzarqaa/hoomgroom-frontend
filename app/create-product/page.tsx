"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

const CreateProductPage: React.FC = () => {
    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        productImage: "",
        productQuantity: 0,
        productPrice: 0,
        productDiscountPrice: 0,
    });

    const [productImageFile, setProductImageFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProductImageFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("product", JSON.stringify(product));
        if (productImageFile) {
            formData.append("file", productImageFile);
        }

        try {
            const response = await axios.post("http://localhost:8080/products", formData);
            console.log("Created product:", response.data);
            window.location.href = '/melihat-semua-produk';
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Name:</label>
                    <input type="text" name="productName" value={product.productName} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" style={{ color: '#000' }} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Description:</label>
                    <textarea name="productDescription" value={product.productDescription} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" style={{ color: '#000' }} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Quantity:</label>
                    <input type="number" name="productQuantity" value={product.productQuantity} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" style={{ color: '#000' }} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Price:</label>
                    <input type="number" name="productPrice" value={product.productPrice} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full"  style={{ color: '#000' }} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Discount Price:</label>
                    <input type="number" name="productDiscountPrice" value={product.productDiscountPrice} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" style={{ color: '#000' }} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Image:</label>
                    <input type="file" accept="image/*" name="productImage" onChange={handleFileChange} className="mt-1 p-2 border rounded-lg w-full" style={{ color: '#000' }} />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProductPage;