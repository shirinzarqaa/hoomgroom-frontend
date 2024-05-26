
import React, { useState } from 'react';

type FilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: { type?: string; minPrice?: number; maxPrice?: number; hasDiscount?: boolean }) => void;
};

const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose, onFilter }) => {
  const [type, setType] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [hasDiscount, setHasDiscount] = useState<boolean | undefined>(undefined);

  const handleApplyFilters = () => {
    onFilter({ type, minPrice, maxPrice, hasDiscount });
    onClose();
  };

  return (
    <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
      <div className="p-4">
        <h2 className="text-xl font-bold">Filter Product</h2>
        <button onClick={onClose} className="text-red-500">Close</button>
        <div className="mt-4">
          <label className="block mb-2">Type:</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Min Price:</label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Max Price:</label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Has Discount:</label>
          <input type="checkbox" checked={hasDiscount} onChange={(e) => setHasDiscount(e.target.checked)} />
        </div>
        <div className="mt-4">
          <button onClick={handleApplyFilters} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;

