import React from 'react';
import { useProductContext } from '../components/ProductsContext';

const Cards: React.FC = () => {
  const { filteredProducts } = useProductContext();

  return (
    <div className="max-w-[1200px] mx-auto justify-center grid grid-cols-3 gap-4 p-8">
      {filteredProducts.map((product) => (
        <div key={product.id} className="card-body cursor-pointer items-center text-center font-bold bg-white shadow-lg p-4 rounded-lg">
          <img src={product.attributes.image} alt={product.attributes.title} className="rounded-xl h-64 md:h-48 w-full object-cover" />
          <div className="mt-4">
            <h3 className="card-title capitalize tracking-wider">{product.attributes.title}</h3>
            <p className="text-sm flex text-primary justify-center mt-4 pb-4 text-gray-600">${product.attributes.price / 100}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
