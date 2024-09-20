import React from 'react';
import { ProductProvider } from './components/ProductsContext';
import Filter from './components/Filter';
import Cards from './components/Cards';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <div>
        <Filter />
        <Cards />
      </div>
    </ProductProvider>
  );
};

export default App;
