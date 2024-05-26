'use client';

import React, { useState, useEffect } from 'react';
import { getAllProducts } from './api/products'; // Pastikan impor fungsi API
import FilterProducts from './components/FilterDrawer';
import SearchBar from './components/SearchBar';
import Navbar from '../navbar';
import ProductCard from './components/ProductCard';
import { UUID } from 'crypto';

type Product = {
  productId: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productQuantity: number;
  productPrice: number;
  productDiscountPrice: number;
  productType: string[];
};


const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log(data)
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (!query) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleFilter = (filters: { type?: string; minPrice?: number; maxPrice?: number; hasDiscount?: boolean }) => {
    let filtered = products;

    if (filters.type) {
      filtered = filtered.filter(product => product.productType.includes(filters.type as string));
    } 
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.productPrice >= (filters.minPrice ?? 0));
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.productPrice <= (filters.maxPrice ?? 0));
    }
    if (filters.hasDiscount) {
      filtered = filtered.filter(product => product.productDiscountPrice);
    }

    setFilteredProducts(filtered);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  

  return (
    <div className="container mx-auto mt-8">
      <Navbar />
      <div className="flex justify-center mt-20">
        <SearchBar onSearch={handleSearch} />
        <div className="w-2"></div>
        <button
          onClick={toggleDrawer}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition-all"
        >
          Filter
        </button>
      </div>
      <FilterProducts isOpen={isDrawerOpen} onClose={toggleDrawer} onFilter={handleFilter} />
      <div className="grid grid-cols-3 gap-4 mt-8 min-h-screen">
      {filteredProducts.map(product => {
        return (
          <ProductCard
            productId={product.productId}
            productName={product.productName}
            productDescription={product.productDescription}
            productImage={product.productImage}
            productQuantity={product.productQuantity}
            productPrice={product.productPrice}
            productDiscountPrice={product.productDiscountPrice}
            productType={product.productType}
          />
        );
      })}
      </div>
    </div>
  );
};

export default ProductsPage;
