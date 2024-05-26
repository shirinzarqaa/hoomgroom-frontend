'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from './api/products';

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

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Destructuring untuk mendapatkan productId langsung
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const data = await getProduct(id);
        setProduct(data);
        console.log(data)
      } catch (error) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

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
    // <div className="container mx-auto mt-8 min-h-screen bg-blue-200">
    //   <div className="flex">
    //     <div className="w-1/2">
    //       <img src={product.productImage} alt={product.productName} />
    //     </div>
    //     <div className="w-1/2">
    //       <h1>{product.productName}</h1>
    //       <p className="text-gray-800">Price: ${product.productPrice}</p>
    //       {product.productDiscountPrice < product.productPrice && (
    //         <p className="text-red-500">Discounted Price: ${product.productDiscountPrice}</p>
    //       )}
    //       <p>Quantity: {product.productQuantity}</p>
    //       <p>Description: {product.productDescription}</p>
    //       <p className="text-gray-600">Type: {product.productType.join(', ')}</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductDetailPage;
