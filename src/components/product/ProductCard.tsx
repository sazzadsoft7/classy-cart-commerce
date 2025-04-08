
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, ImageOff } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, imageUrl, rating, reviews, category, inStock } = product;
  const [imageError, setImageError] = React.useState(false);

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <Link to={`/products/${id}`} className="relative overflow-hidden pt-[100%] bg-secondary/10">
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
            <ImageOff className="h-12 w-12 text-muted-foreground" />
            <span className="sr-only">{name}</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-2 py-1">Out of Stock</Badge>
          </div>
        )}
        <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">{category}</Badge>
      </Link>
      
      <CardContent className="p-4 flex-grow">
        <Link to={`/products/${id}`}>
          <h3 className="font-medium text-base mb-1 hover:text-primary transition-colors line-clamp-2">{name}</h3>
        </Link>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span className="text-sm ml-1 font-medium">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground ml-2">({reviews} reviews)</span>
        </div>
        <div className="mt-2 font-bold text-lg">${price.toFixed(2)}</div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          disabled={!inStock}
          className="w-full gap-2"
          variant={inStock ? "default" : "outline"}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
