
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-secondary/50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Discover Quality Products for Every Need
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Shop our curated collection of premium products at competitive prices with fast shipping and excellent service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="gap-2">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" variant="outline">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg overflow-hidden shadow-xl">
              <img
                src="/placeholder.svg"
                alt="Hero Image"
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-black/10 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-accent p-4 rounded-lg shadow-lg">
              <div className="font-bold text-accent-foreground">Special Offer</div>
              <div className="text-sm text-accent-foreground/80">Up to 40% off</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
