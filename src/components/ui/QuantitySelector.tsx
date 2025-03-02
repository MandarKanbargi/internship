// components/ui/QuantitySelector.tsx

import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  maxQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity = Infinity
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="p-2 disabled:opacity-50"
      >
        <Minus size={18} />
      </button>
      
      <span className="px-4 py-1 font-medium">{quantity}</span>
      
      <button
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
        className="p-2 disabled:opacity-50"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default QuantitySelector;