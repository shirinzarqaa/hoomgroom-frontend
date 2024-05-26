
import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  productId: string;
  productName: string;
  productDescription: string;
  productImage: string;
  productQuantity: number;
  productPrice: number;
  productDiscountPrice: number;
  productType: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  productDescription,
  productImage,
  productQuantity,
  productPrice,
  productDiscountPrice,
  productType,
}) => {
  return (
    <Link href={`/melihat-rincian-produk/${productId}`} className="product-card border p-4 rounded-lg shadow-md bg-white">
      <img src={productImage} alt={productName} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-semibold mt-2">{productName}</h3>
      <p className="text-gray-600">{productDescription}</p>
      <p className="text-gray-800">Price: ${productPrice}</p>
      {productDiscountPrice < productPrice && (
        <p className="text-red-500">Discounted Price: ${productDiscountPrice}</p>
      )}
      <p className="text-gray-600">Quantity: {productQuantity}</p>
      <p className="text-gray-600">Type: {productType.join(', ')}</p>
    </Link>
  );
};

export default ProductCard;

