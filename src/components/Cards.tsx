import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  attributes: {
    title: string;
    category: string;
    company: string;
    price: number;
    image: string;
  };
}

interface Filters {
  search: string;
  category: string;
  company: string;
  sort: string;
  price: number;
}

interface CardsProps {
  filters: Filters;
}

const Cards: React.FC<CardsProps> = ({ filters }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://strapi-store-server.onrender.com/api/products');
        const jsonData = await response.json();
        const fetchedProducts = jsonData.data as Product[];
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (filters.search) {
      filtered = filtered.filter((product) =>
        product.attributes.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter((product) =>
        product.attributes.category === filters.category
      );
    }

    if (filters.company) {
      filtered = filtered.filter((product) =>
        product.attributes.company === filters.company
      );
    }

    filtered = filtered.filter((product) =>
      product.attributes.price / 100 <= filters.price
    );

    if (filters.sort) {
      filtered.sort((a, b) => {
        if (filters.sort === 'az') {
          return a.attributes.title.localeCompare(b.attributes.title);
        } else if (filters.sort === 'za') {
          return b.attributes.title.localeCompare(a.attributes.title);
        } else if (filters.sort === 'high') {
          return b.attributes.price - a.attributes.price;
        } else if (filters.sort === 'low') {
          return a.attributes.price - b.attributes.price;
        }
        return 0;
      });
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
          <img
            src={product.attributes.image}
            alt={product.attributes.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-2 text-lg font-bold">{product.attributes.title}</h3>
          <p className="text-gray-700">${(product.attributes.price / 100).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
