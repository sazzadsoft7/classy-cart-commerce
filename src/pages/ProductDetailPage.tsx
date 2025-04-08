
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, ArrowLeft, Star, Truck, RotateCcw, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { getProductById, products } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const product = useMemo(() => {
    return getProductById(id || '');
  }, [id]);
  
  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/products">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }
  
  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/products" 
        className="inline-flex items-center text-sm hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-secondary/30 rounded-lg overflow-hidden flex items-center justify-center p-8">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-h-96 object-contain"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{product.category}</Badge>
            {product.inStock ? (
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                In Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center mt-2 mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              <span className="ml-1 mr-1 font-medium">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
          </div>
          
          <div className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <span className="font-medium">Free Shipping</span>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $100
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <RotateCcw className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <span className="font-medium">Easy Returns</span>
                <p className="text-sm text-muted-foreground">
                  30-day return policy
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <span className="font-medium">Secure Checkout</span>
                <p className="text-sm text-muted-foreground">
                  Encrypted payment processing
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            size="lg"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="w-full sm:w-auto"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
