import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filterProducts: () => void;
  handleReset: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: 'all',
    company: '',
    sort: '',
    price: 1000,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://strapi-store-server.onrender.com/api/products');
        const jsonData = await response.json();
        const fetchedProducts = jsonData.data as Product[];
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = () => {
    let tempProducts = [...products];

    if (filters.search) {
      tempProducts = tempProducts.filter(product =>
        product.attributes.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      tempProducts = tempProducts.filter(product =>
        product.attributes.category === filters.category
      );
    }

    if (filters.company) {
      tempProducts = tempProducts.filter(product =>
        product.attributes.company === filters.company
      );
    }

    tempProducts = tempProducts.filter(product =>
      product.attributes.price / 100 <= filters.price
    );

    if (filters.sort === 'az') {
      tempProducts.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title));
    } else if (filters.sort === 'za') {
      tempProducts.sort((a, b) => b.attributes.title.localeCompare(a.attributes.title));
    } else if (filters.sort === 'low') {
      tempProducts.sort((a, b) => a.attributes.price - b.attributes.price);
    } else if (filters.sort === 'high') {
      tempProducts.sort((a, b) => b.attributes.price - a.attributes.price);
    }

    setFilteredProducts(tempProducts);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'all',
      company: '',
      sort: '',
      price: 1000,
    });
    setFilteredProducts(products);
  };

  return (
    <ProductContext.Provider
      value={{ products, filteredProducts, filters, setFilters, filterProducts, handleReset }}
    >
      {children}
    </ProductContext.Provider>
  );
};
