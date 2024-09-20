import React from 'react';
import { useProductContext } from '../components/ProductsContext';

const Filter: React.FC = () => {
  const { filters, setFilters, filterProducts, handleReset } = useProductContext();

  return (
    <div className="w-[1124px] h-[220px] bg-[#F0F6FF] pt-6 pl-9 rounded-lg mx-auto my-20">
      <div className="max-w-[1200px] w-full mx-auto">
        <div className="flex gap-5">
          <label className="input input-bordered input-sm flex items-center gap-2 w-[235px] mt-7">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </label>

          <span>
            <p className="text-sm text-gray-600 font-normal mb-2">Select Category</p>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="select select-bordered select-sm w-[250px]"
            >
              <option value="all">all</option>
              <option value="Tables">Tables</option>
              <option value="Chairs">Chairs</option>
              <option value="Kids">Kids</option>
              <option value="Sofas">Sofas</option>
              <option value="Beds">Beds</option>
            </select>
          </span>

          <span>
            <p className="text-sm text-gray-600 font-normal mb-2">Select Company</p>
            <select
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              className="select select-bordered select-sm w-[250px]"
            >
              <option value="">all</option>
              <option value="Modenza">Modenza</option>
              <option value="Luxora">Luxora</option>
              <option value="Artifex">Artifex</option>
              <option value="Comfora">Comfora</option>
              <option value="Homestead">Homestead</option>
            </select>
          </span>

          <span>
            <p className="text-sm text-gray-600 font-normal mb-2">Sort By</p>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="select select-bordered select-sm w-[250px]"
            >
              <option value="az">a-z</option>
              <option value="za">z-a</option>
              <option value="high">high</option>
              <option value="low">low</option>
            </select>
          </span>
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-2 p-2 rounded-lg">
            <span className="flex">
              <p className="text-[15px] font-normal">Select Price</p>
              <span className="ml-[120px] font-normal text-sm">${filters.price}.00</span>
            </span>
            <input
              onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
              type="range"
              min={0}
              max={1000}
              value={filters.price}
              className="range range-info w-64"
            />
            <div className="flex text-xs text-gray-500">
              <span>0</span>
              <span className="ml-[165px]">Max : $1,000.00</span>
            </div>
          </div>

          <div className="flex items-center gap-5 relative top-[-65px] left-[345px]">
            <label className="flex items-center gap-2">
              Free Shipping
              <input type="checkbox" defaultChecked className="checkbox ml-[-60px] mb-[-50px] w-[18px] h-[18px]" />
            </label>
            <button
              onClick={filterProducts}
              className="w-[250px] ml-24 bg-[#007bff] text-gray-200 font-bold py-2 rounded-lg"
            >
              SEARCH
            </button>
            <button
              onClick={handleReset}
              className="w-[250px] bg-[#d63384] text-gray-200 font-bold py-2 rounded-lg"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
