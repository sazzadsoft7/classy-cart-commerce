
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/product/FeaturedProducts';
import CategorySection from '@/components/product/CategorySection';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      
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
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1000" 
                alt="Free Shipping"
                className="max-h-60 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Image Carousel Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Products Gallery</h2>
          <Carousel className="mx-auto max-w-4xl">
            <CarouselContent>
              <CarouselItem>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1570087935421-5ef75fbce5c3?q=80&w=1000" 
                      alt="Premium Coffee Maker"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <h3 className="mt-2 font-medium text-center">Premium Coffee Maker</h3>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000" 
                      alt="Wireless Headphones"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <h3 className="mt-2 font-medium text-center">Wireless Headphones</h3>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000" 
                      alt="Smartphone Pro Max"
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <h3 className="mt-2 font-medium text-center">Smartphone Pro Max</h3>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-1" />
            <CarouselNext className="right-1" />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
