import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BOTTLE_COLORS } from '../constants';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-neutral-500 mb-8">Looks like you haven't added any Pure Steel bottles yet.</p>
        <Link to="/">
          <Button variant="outline" className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tighter mb-10">Your Cart</h1>
      
      <div className="space-y-8">
        {cart.map((item) => {
          const colorInfo = BOTTLE_COLORS.find(c => c.name === item.color);
          return (
            <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-6 items-center">
              <div className="w-24 h-24 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={colorInfo?.img || `https://picsum.photos/seed/${item.color.toLowerCase()}-bottle/200/200?grayscale`}
                  alt={item.color}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold text-lg">Pure Steel Classic</h3>
                <p className="text-neutral-500 text-sm mb-2">{item.color} • {item.size}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-neutral-200 rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-neutral-400 hover:text-red-500"
                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-neutral-400">${item.price} each</p>
              </div>
            </div>
          );
        })}
      </div>

      <Separator className="my-10" />

      <div className="flex flex-col items-end">
        <div className="w-full sm:w-80 space-y-4">
          <div className="flex justify-between text-lg">
            <span className="text-neutral-500">Subtotal</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-neutral-500">Shipping</span>
            <span className="font-bold text-green-600">Free</span>
          </div>
          <Separator />
          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          
          <Link to="/checkout" className="block pt-4">
            <Button className="w-full py-6 text-lg rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
