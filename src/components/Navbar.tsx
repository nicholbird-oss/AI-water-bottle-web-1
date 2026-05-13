import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold tracking-tighter text-neutral-900">
            PURE STEEL
          </Link>
          
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-neutral-500 mr-2">
                <User className="h-4 w-4" />
                <span className="max-w-[100px] truncate">{user.email}</span>
              </div>
            )}
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-neutral-900 text-white border-2 border-white">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {user && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => signOut()}
                className="text-neutral-500 hover:text-red-500"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
