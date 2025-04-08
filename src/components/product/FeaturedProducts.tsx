
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { getFeaturedProducts } from '@/data/products';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground mt-1">
              Check out our most popular items hand-picked by our team.
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" size="sm" className="mt-2 md:mt-0">
              <span>View All</span> 
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
