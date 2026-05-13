import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`
        });

        // Save to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          firstName,
          lastName,
          createdAt: new Date().toISOString()
        });

        toast.success("Account created successfully!");
      }
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Sign In" : "Create Account"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reg-firstName">First Name</Label>
              <Input 
                id="reg-firstName" 
                required 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-lastName">Last Name</Label>
              <Input 
                id="reg-lastName" 
                required 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                placeholder="Doe"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="auth-email">Email</Label>
          <Input 
            id="auth-email" 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="john@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="auth-password">Password</Label>
          <Input 
            id="auth-password" 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-6 rounded-xl mt-4"
        >
          {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}
