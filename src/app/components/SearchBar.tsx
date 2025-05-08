'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { featuredProducts, flashSaleProducts } from '../products';

interface Product {
  id?: number;
  _id?: string;
  name: string;
  price: number;
  brand: string;
  img: string;
  images: string[];
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const router = useRouter();

  // Combine all products
  const allProducts = [...featuredProducts, ...flashSaleProducts];

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleProductClick = (product: Product) => {
    const productId = product._id || product.id;
    if (!productId) return;
    router.push(`/product/${productId}`);
    setSearchTerm('');
    setIsResultsVisible(false);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xl search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsResultsVisible(true);
        }}
        onFocus={() => setIsResultsVisible(true)}
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {isResultsVisible && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {searchResults.map((product) => (
            <div
              key={product._id || product.id}
              onClick={() => handleProductClick(product)}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={`/images/${product.images[0]}`}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="ml-3">
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">{product.brand}</p>
                <p className="text-sm font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 