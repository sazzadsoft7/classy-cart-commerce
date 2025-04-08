
import React from 'react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { id, name, price, imageUrl, quantity } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  return (
    <div className="flex items-center py-4 border-b">
      <div className="w-20 h-20 flex-shrink-0 bg-secondary rounded">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <Link 
          to={`/products/${id}`}
          className="font-medium text-base hover:text-primary transition-colors"
        >
          {name}
        </Link>
        <div className="mt-1 text-sm text-muted-foreground">
          ${price.toFixed(2)} x {quantity} = <span className="font-medium text-foreground">${(price * quantity).toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded-md">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none"
            onClick={handleDecrease}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="w-8 text-center">{quantity}</span>
          
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none"
            onClick={handleIncrease}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => removeFromCart(id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
