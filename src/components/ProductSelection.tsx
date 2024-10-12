import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductSelectionProps {
  onSelect: (product: string) => void;
}

const productCategories = {
  'T-Shirts': ['Men\'s Crew Neck', 'Women\'s V-Neck', 'Kids\' T-Shirt'],
  'Mugs': ['Classic Mug', 'Travel Mug', 'Enamel Mug'],
  'Phone Cases': ['iPhone Case', 'Samsung Case', 'Google Pixel Case'],
};

const ProductSelection: React.FC<ProductSelectionProps> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedProduct('');
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      onSelect(selectedProduct);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">What product are we designing for today?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Product Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select a category</option>
              {Object.keys(productCategories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
        {selectedCategory && (
          <div className="mb-4">
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
              Specific Product
            </label>
            <div className="relative">
              <select
                id="product"
                value={selectedProduct}
                onChange={handleProductChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select a product</option>
                {productCategories[selectedCategory as keyof typeof productCategories].map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        )}
        <button
          type="submit"
          disabled={!selectedProduct}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default ProductSelection;