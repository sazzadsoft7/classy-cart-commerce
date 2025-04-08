
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/product/FeaturedProducts';
import CategorySection from '@/components/product/CategorySection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      
      {/* Additional sections could go here */}
      <section className="py-12 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">Free shipping on orders over $100</h2>
              <p className="text-muted-foreground mb-6">
                Shop with confidence and enjoy free shipping on all orders over $100. With our fast and reliable shipping service, you can have your items delivered right to your doorstep without any extra costs.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Free Shipping" 
                className="max-h-60 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
