
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const CartSummary: React.FC = () => {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  
  // Calculate shipping cost (free if order is over $100)
  const shippingCost = cart.total >= 100 ? 0 : 5.99;
  
  // Calculate tax (example: 8%)
  const taxRate = 0.08;
  const taxAmount = cart.total * taxRate;
  
  // Calculate final total
  const orderTotal = cart.total + shippingCost + taxAmount;
  
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${cart.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            {shippingCost === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              <span>${shippingCost.toFixed(2)}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
          
          {cart.total < 100 && (
            <div className="text-xs text-muted-foreground bg-secondary p-2 rounded text-center">
              Add ${(100 - cart.total).toFixed(2)} more for free shipping!
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        {isAuthenticated ? (
          <Link to="/checkout" className="w-full">
            <Button className="w-full" disabled={cart.items.length === 0}>
              Proceed to Checkout
            </Button>
          </Link>
        ) : (
          <div className="w-full space-y-2">
            <Link to="/login?redirect=checkout" className="block w-full">
              <Button className="w-full" disabled={cart.items.length === 0}>
                Login & Checkout
              </Button>
            </Link>
            <div className="text-xs text-center text-muted-foreground">
              Have an account? <Link to="/login" className="text-primary hover:underline">Login</Link> or{" "}
              <Link to="/register" className="text-primary hover:underline">Register</Link>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
