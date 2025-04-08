
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, PackageOpen, ArrowRight } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { items, itemCount } = cart;
  
  const isEmpty = items.length === 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-secondary p-6">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mt-6">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-center">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button className="mt-6">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <PackageOpen className="h-5 w-5 mr-2" />
                  <h2 className="text-xl font-medium">
                    Cart Items ({itemCount})
                  </h2>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="space-y-0">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Link to="/products">
                  <Button variant="outline" size="sm">
                    Continue Shopping
                  </Button>
                </Link>
                
                <Link to="/checkout">
                  <Button size="sm" className="gap-2">
                    <span>Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
