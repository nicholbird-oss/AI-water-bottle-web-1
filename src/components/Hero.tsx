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
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="https://lh3.googleusercontent.com/pw/AP1GczM8aYHPDmdBCRr-mpAvhd1RrIZFFM_i_Q7MXTJ94IavSZVDAH_um2d8yihBM9jrcJPaVT1X_X49REWz-t_3WwtfBpz9OrYD7vpq5qNRxnvDWibNLkRJ-t7JXL4mgOeta4BM8u3IBTUdGluv5sZHOsk=w1408-h768-s-no?authuser=3"
            >
              <source src="/input_file_0.mp4" type="video/mp4" />
              <source 
                src="https://photos.google.com/share/AF1QipNu_x96E_qSSOka47RdrEhfgUFBbfWrWDenWZ816n2ErIGtgO0tIoxuKYuF10Y-Wg/photo/AF1QipOjUlvcJBG1QILMEtltfAys8YHw43KmmNobKKZg?key=aFJSRF9ldnZ3VXY3b1ZzZVczbGhVOS01eVdNNU1R" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
