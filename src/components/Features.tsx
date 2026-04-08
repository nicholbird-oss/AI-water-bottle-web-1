import { Shield, Leaf, Zap, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Zero Microplastics",
    description: "100% medical-grade stainless steel. No plastic liners, no BPA, no chemicals leaching into your water."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Packaging",
    description: "Our commitment to the planet starts with 100% recyclable, plastic-free packaging for every order."
  },
  {
    icon: Zap,
    title: "Ergonomic Design",
    description: "Designed to fit perfectly in your hand and most cup holders. A seamless blend of form and function."
  },
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description: "High-quality steel doesn't have to cost a fortune. We cut out the middleman to bring you premium quality at a fair price."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="p-3 bg-white rounded-xl shadow-sm border border-neutral-100 mb-6">
                <feature.icon className="h-6 w-6 text-neutral-900" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
