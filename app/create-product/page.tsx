"use client";
// pages/create-product.tsx

import { useState } from "react";

const CreateProductPage: React.FC = () => {
    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        productImage: "",
        productQuantity: 0,
        productPrice: 0,
        productDiscountPrice: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate creating product data
        // Replace this with actual create logic
        console.log("Created product:", product);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Create Product</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Name:</label>
                    <input type="text" name="productName" value={product.productName} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Description:</label>
                    <textarea name="productDescription" value={product.productDescription} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Image:</label>
                    <input type="file" accept="image/*" name="productImage" onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Quantity:</label>
                    <input type="number" name="productQuantity" value={product.productQuantity} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Price:</label>
                    <input type="number" name="productPrice" value={product.productPrice} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Product Discount Price:</label>
                    <input type="number" name="productDiscountPrice" value={product.productDiscountPrice} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Create Product</button>
            </form>
        </div>
    );
};

export default CreateProductPage;
