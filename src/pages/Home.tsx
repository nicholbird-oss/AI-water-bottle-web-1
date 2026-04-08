import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductSelector from '../components/ProductSelector';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <ProductSelector />
      <footer className="py-12 border-t border-neutral-100 text-center text-neutral-400 text-sm">
        &copy; {new Date().getFullYear()} Pure Steel. All rights reserved.
      </footer>
    </main>
  );
}
