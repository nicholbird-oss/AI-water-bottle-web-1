import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order placed successfully! Thank you for choosing Pure Steel.");
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" required placeholder="john@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" required placeholder="+1 (555) 000-0000" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Shipping Address</Label>
              <Input id="address" required placeholder="123 Steel St, Minimal City, 12345" />
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              <div className="p-4 border-2 border-neutral-900 rounded-xl flex items-center justify-between bg-neutral-50">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-neutral-900" />
                  <span className="font-bold">PayPal</span>
                </div>
                <img 
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                  alt="PayPal" 
                  className="h-6"
                />
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                You will be redirected to PayPal to complete your purchase securely.
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={isProcessing}
              className="w-full py-8 text-lg rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white mt-8"
            >
              {isProcessing ? "Processing..." : `Pay $${totalPrice.toFixed(2)} with PayPal`}
            </Button>
          </form>
        </div>

        <div className="lg:pt-16">
          <Card className="border-neutral-100 shadow-sm sticky top-32">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-neutral-600">
                    Pure Steel Classic ({item.color}, {item.size}) x {item.quantity}
                  </span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
