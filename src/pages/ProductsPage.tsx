
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import ProductGrid from '@/components/product/ProductGrid';
import { Product, Category, SortOption } from '@/types';
import { products } from '@/data/products';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const sortOptions: SortOption[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating: High to Low', value: 'rating_desc' },
];

const categoryOptions: { label: string; value: Category }[] = [
  { label: 'All Products', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Books', value: 'books' },
  { label: 'Home', value: 'home' },
  { label: 'Beauty', value: 'beauty' },
];

const ProductsPage: React.FC = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Get min and max prices from products
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = products.map(product => product.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Filter by search query
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Filter by category
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        
        // Filter by price
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        
        // Filter by stock
        const matchesStock = !inStockOnly || product.inStock;
        
        return matchesSearch && matchesCategory && matchesPrice && matchesStock;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating_desc':
            return b.rating - a.rating;
          case 'newest':
          default:
            return b.id.localeCompare(a.id); // Assuming newer products have higher IDs
        }
      });
  }, [searchQuery, selectedCategory, sortBy, priceRange, inStockOnly]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('newest');
    setPriceRange([minPrice, maxPrice]);
    setInStockOnly(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Narrow down your product search.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                {/* Mobile Filters (same as desktop) */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="mobile-category">Category</Label>
                    <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)}>
                      <SelectTrigger id="mobile-category" className="w-full mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Price Range</Label>
                    <div className="pt-4 px-2">
                      <Slider
                        min={minPrice}
                        max={maxPrice}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${priceRange[0].toFixed(0)}</span>
                      <span>${priceRange[1].toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="mobile-in-stock" 
                      checked={inStockOnly} 
                      onCheckedChange={(checked) => setInStockOnly(!!checked)} 
                    />
                    <Label htmlFor="mobile-in-stock">In stock only</Label>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block space-y-6">
          <div className="border rounded-lg p-4 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Search</h3>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-6 w-6"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categoryOptions.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <Checkbox 
                      id={`category-${option.value}`}
                      checked={selectedCategory === option.value}
                      onCheckedChange={() => setSelectedCategory(option.value)}
                    />
                    <Label 
                      htmlFor={`category-${option.value}`} 
                      className="ml-2 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  min={minPrice}
                  max={maxPrice}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span>${priceRange[0].toFixed(0)}</span>
                <span>${priceRange[1].toFixed(0)}</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="in-stock" 
                  checked={inStockOnly} 
                  onCheckedChange={(checked) => setInStockOnly(!!checked)} 
                />
                <Label htmlFor="in-stock">In stock only</Label>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
        
        {/* Product Listings */}
        <div className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search or filter criteria.
              </p>
              <Button className="mt-4" variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
