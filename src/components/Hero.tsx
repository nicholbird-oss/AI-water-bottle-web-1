import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900 mb-6">
              The Last Bottle <br />
              <span className="text-neutral-400">You'll Ever Need.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-neutral-600 mb-10">
              Pure Steel is crafted for the minimalists, the adventurers, and the eco-conscious. 
              Sleek design meets uncompromising durability.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 bg-neutral-900 hover:bg-neutral-800 text-white" onClick={() => document.getElementById('product-selector')?.scrollIntoView({ behavior: 'smooth' })}>
                Shop Now
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-20 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-100">
            <iframe
              src="https://www.youtube.com/embed/D84KFeAfZM8?autoplay=1&mute=1&loop=1&playlist=D84KFeAfZM8&controls=0&rel=0&modestbranding=1"
              title="Pure Steel Bottle"
              className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
