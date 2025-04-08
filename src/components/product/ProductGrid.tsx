
import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductGridProps {
  products: Product[];
  className?: string;
  scrollable?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  className = "",
  scrollable = false
}) => {
  if (scrollable) {
    return (
      <ScrollArea className="w-full pb-4">
        <div className="flex space-x-4 pb-4">
          {products.map((product) => (
            <div key={product.id} className="w-[260px] min-w-[260px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
