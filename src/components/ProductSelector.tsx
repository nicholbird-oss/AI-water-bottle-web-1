import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { BottleColor, BottleSize } from '../types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateBottleImage, hasApiKey, openApiKeyDialog } from '../services/geminiService';
import { Sparkles } from 'lucide-react';
import { BOTTLE_COLORS } from '../constants';

interface ProductCardProps {
  color: { name: BottleColor; hex: string; img: string };
  aiImage?: string;
  onGenerateAi: (color: BottleColor) => Promise<void>;
  isGenerating: boolean;
  needsKey: boolean;
}

const ProductCard = ({ color, aiImage, onGenerateAi, isGenerating, needsKey }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<BottleSize>('Standard');
  const displayImage = aiImage || color.img;

  const handleAddToCart = () => {
    addToCart(color.name, selectedSize);
    toast.success(`Added ${selectedSize} ${color.name} Pure Steel bottle to cart!`);
  };

  const currentPrice = selectedSize === 'Large' ? 34.99 : 29.99;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col group"
    >
      <div className="relative aspect-[4/5] bg-neutral-100 rounded-3xl overflow-hidden mb-6">
        {isGenerating ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-50">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-10 w-10 text-neutral-300" />
            </motion.div>
            <p className="mt-4 text-xs text-neutral-400 font-medium animate-pulse">Creating visual...</p>
          </div>
        ) : (
          <img
            src={displayImage}
            alt={`${color.name} bottle`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        )}
        
        {color.name === 'Silver' && !aiImage && !isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              onClick={() => onGenerateAi(color.name)}
              className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full shadow-lg text-xs h-9"
            >
              <Sparkles className="mr-2 h-3 w-3" /> AI Visual
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-neutral-900">Pure Steel Classic</h3>
          <p className="text-neutral-500 text-sm">{color.name}</p>
        </div>
        <p className="font-bold text-neutral-900">${currentPrice}</p>
      </div>

      <div className="flex gap-2 mt-2 mb-4">
        {(['Standard', 'Large'] as BottleSize[]).map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-3 py-1 text-xs rounded-full border transition-all ${
              selectedSize === size
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-900'
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <Button 
        onClick={handleAddToCart}
        variant="outline"
        className="w-full rounded-xl border-neutral-200 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
      >
        Add to Cart
      </Button>
    </motion.div>
  );
};

export default function ProductSelector() {
  const [aiImages, setAiImages] = useState<Record<string, string>>({});
  const [generatingColor, setGeneratingColor] = useState<BottleColor | null>(null);
  const [needsKey, setNeedsKey] = useState(false);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    const keySelected = await hasApiKey();
    setNeedsKey(!keySelected);
  };

  const handleGenerateAiImage = async (color: BottleColor) => {
    if (needsKey) {
      await openApiKeyDialog();
      setNeedsKey(false);
    }

    setGeneratingColor(color);
    try {
      const imageUrl = await generateBottleImage(color);
      setAiImages(prev => ({ ...prev, [color]: imageUrl }));
      toast.success(`AI generated a custom visual for the ${color} bottle!`);
    } catch (error: any) {
      if (error.message?.includes("entity was not found")) {
        setNeedsKey(true);
        toast.error("Please select a valid Gemini API key to use AI features.");
      } else {
        toast.error("Failed to generate AI image. Please try again.");
      }
    } finally {
      setGeneratingColor(null);
    }
  };

  return (
    <section id="product-selector" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-900 mb-4">Choose Your Finish</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Available in four signature finishes. Each bottle features double-walled vacuum insulation 
            and 18/8 food-grade stainless steel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {BOTTLE_COLORS.map((color) => (
            <div key={color.name}>
              <ProductCard
                color={color}
                aiImage={aiImages[color.name]}
                onGenerateAi={handleGenerateAiImage}
                isGenerating={generatingColor === color.name}
                needsKey={needsKey}
              />
            </div>
          ))}
        </div>

        {needsKey && (
          <div className="mt-16 p-6 bg-neutral-50 rounded-2xl text-center max-w-xl mx-auto">
            <p className="text-sm text-neutral-600 mb-2">
              Want to see AI-generated lifestyle visuals for these bottles?
            </p>
            <Button 
              variant="link" 
              onClick={openApiKeyDialog}
              className="text-neutral-900 font-bold"
            >
              Setup Gemini API Key
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

