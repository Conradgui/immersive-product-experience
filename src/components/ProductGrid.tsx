import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  type: string;
  chineseName: string;
  description: string;
  image: string;
  sizes: { size: string; price: string; note?: string }[];
}

const products: Product[] = [
  {
    id: 'edt',
    name: 'Un Jardin sur le Nil',
    type: 'Eau de toilette',
    chineseName: '尼罗河花园淡香水',
    description: 'A garden of life, generous and sparkling, where the scents of green mango, lotus, and rush blend with incense and sycamore wood. The iconic carriage-lantern bottle features a delicate green gradient.',
    image: '/images/jardin_bottle_box.png',
    sizes: [
      { size: '30 ml', price: '$85' },
      { size: '50 ml', price: '$110' },
      { size: '100 ml', price: '$145', note: 'Most Popular' },
      { size: '200 ml Refill', price: '$190', note: 'Eco-conscious' }
    ]
  },
  {
    id: 'dry-oil',
    name: 'Un Jardin sur le Nil',
    type: 'Hair and body dry oil',
    chineseName: '尼罗河花园身体与头发干性香体油',
    description: 'An elegant dry oil that absorbs instantly to nourish hair and skin, wrapping them in a delicate green breeze of mango and lotus. It leaves a satin-smooth finish and a subtle fragrance trail.',
    image: '/images/jardin_dry_oil.png',
    sizes: [
      { size: '50 ml', price: '$72', note: 'Limited Release' }
    ]
  }
];

export default function ProductGrid() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    edt: 2, // Default to 100ml for EDT
    'dry-oil': 0 // Default to 50ml for oil
  });

  const handleSizeSelect = (productId: string, sizeIndex: number) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: sizeIndex
    }));
  };

  return (
    <section id="collection" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in">
          <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-hermes-orange mb-3 block">
            THE ESSENTIALS
          </span>
          <h2 className="font-serif text-4xl font-light text-hermes-charcoal md:text-5xl">
            The Nile Ritual Collection
          </h2>
          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-hermes-charcoal/60">
            From the refreshing impressionist Eau de Toilette to the satin-finish dry oil. Choose your size and experience the green breeze of the Nile gardens.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
          {products.map((product) => {
            const activeSizeIndex = selectedSizes[product.id] || 0;
            const activeSize = product.sizes[activeSizeIndex];

            return (
              <div 
                key={product.id}
                className="group flex flex-col justify-between rounded-3xl border border-hermes-sand/40 bg-gradient-to-b from-hermes-cream/30 to-transparent p-6 md:p-8 hover:shadow-[0_20px_50px_rgba(138,154,134,0.08)] transition-all duration-500 fade-in"
              >
                {/* Product Image Area */}
                <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-hermes-cream/10 pb-6">
                  {/* Soft background glow */}
                  <div className="absolute h-48 w-48 rounded-full bg-hermes-sage/5 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-auto object-contain drop-shadow-[0_15px_30px_rgba(61,74,62,0.12)] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  
                  {activeSize?.note && (
                    <span className="liquid-glass absolute right-4 top-4 rounded-full px-4 py-1.5 font-sans text-[9px] font-bold tracking-widest text-hermes-orange">
                      {activeSize.note.toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Product Details Section */}
                <div className="mt-8 text-left">
                  <span className="font-sans text-[10px] font-bold tracking-[0.25em] text-hermes-sage uppercase">
                    {product.type}
                  </span>
                  
                  <div className="mt-1 flex items-baseline justify-between">
                    <h3 className="font-serif text-2xl font-light text-hermes-charcoal md:text-3xl">
                      {product.name}
                    </h3>
                    <span className="font-sans text-xl font-medium text-hermes-charcoal">
                      {activeSize?.price}
                    </span>
                  </div>

                  <p className="mt-1 font-sans text-[11px] font-semibold text-hermes-charcoal/40 italic">
                    {product.chineseName}
                  </p>

                  <p className="mt-4 min-h-[72px] font-sans text-sm font-light leading-relaxed text-hermes-charcoal/65">
                    {product.description}
                  </p>

                  {/* Size Selector Triggers */}
                  <div className="mt-8 pt-6 border-t border-hermes-sand/20">
                    <p className="font-sans text-[10px] font-bold tracking-widest text-hermes-charcoal/40 mb-3 uppercase">
                      Select Size
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s, idx) => (
                        <button
                          key={s.size}
                          onClick={() => handleSizeSelect(product.id, idx)}
                          className={`rounded-full px-5 py-2.5 font-sans text-xs font-semibold tracking-widest transition-all duration-300 ${
                            activeSizeIndex === idx
                              ? 'bg-hermes-charcoal text-white shadow-md'
                              : 'bg-hermes-cream hover:bg-hermes-sand/50 text-hermes-charcoal/80 border border-hermes-sand/30'
                          }`}
                        >
                          {s.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button className="mt-8 w-full rounded-full border border-hermes-charcoal bg-transparent py-4 text-center font-sans text-xs font-semibold tracking-[0.25em] text-hermes-charcoal transition-all duration-300 hover:bg-hermes-charcoal hover:text-white">
                    ADD TO BAG
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
