import { useState } from 'react';

interface ScentNote {
  id: 'top' | 'heart' | 'base';
  title: string;
  subTitle: string;
  chineseTitle: string;
  ingredients: string[];
  description: string;
  highlightClass: string;
}

const scentNotes: ScentNote[] = [
  {
    id: 'top',
    title: 'Top Note (前调)',
    subTitle: 'Green Mango & Grapefruit',
    chineseTitle: '青芒果、葡萄柚、西红柿茎、胡萝卜籽',
    ingredients: ['Green Mango', 'Grapefruit', 'Tomato Leaf', 'Carrot Seed'],
    description: 'A sharp, sparkling burst of green fruits. The opening is a fresh, tangy stroll along the banks of the Nile, where the vegetal scent of green mango is rounded out by zesty grapefruit and tomato leaf.',
    highlightClass: 'top-0 h-1/3'
  },
  {
    id: 'heart',
    title: 'Heart Note (中调)',
    subTitle: 'Nile Lotus & Calamus',
    chineseTitle: '埃及睡莲、尼罗河菖蒲、橙子、牡丹',
    ingredients: ['Nile Lotus', 'Calamus (Rush)', 'Orange', 'Peony'],
    description: 'The core of the fragrance. Translucent and aquatic, the Nile Lotus brings a delicate, watery sweetness that floats elegantly alongside calamus and hyacinth, evoking a garden blooming in the morning sun.',
    highlightClass: 'top-1/3 h-1/3'
  },
  {
    id: 'base',
    title: 'Base Note (后调)',
    subTitle: 'Sycamore Wood & Incense',
    chineseTitle: '梧桐木、乳香、鸢尾花、肉桂',
    ingredients: ['Sycamore Wood', 'Incense', 'Iris', 'Musk'],
    description: 'A rich, grounded finish. Elegantly complex, the dry-down settles into sycamore wood and warm incense, with powdery iris and musk creating a sophisticated, lingering shadow of wood and sand.',
    highlightClass: 'bottom-0 h-1/3'
  }
];

export default function ScentJourney() {
  const [activeNoteId, setActiveNoteId] = useState<'top' | 'heart' | 'base'>('top');

  const activeNote = scentNotes.find(note => note.id === activeNoteId)!;

  return (
    <section id="scent-journey" className="bg-hermes-cream py-20 md:py-28 border-t border-hermes-sand/30">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 fade-in">
          <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-hermes-sage mb-3 block">
            THE OLFACTORY STROLL
          </span>
          <h2 className="font-serif text-4xl font-light text-hermes-charcoal md:text-5xl">
            Un Jardin sur le Nil, of water and sun
          </h2>
          <p className="mt-4 font-sans text-sm font-light leading-relaxed text-hermes-charcoal/60">
            Jean-Claude Ellena’s impressionistic stroll through the island-gardens at Aswan. Touch the layers to explore the components of this refreshing ode.
          </p>
        </div>

        {/* Interactive Interactive Note Explorer Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Sliced Ingredient Visual */}
          <div className="relative flex justify-center lg:col-span-5 order-2 lg:order-1 fade-in">
            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(61,74,62,0.1)] group max-w-[360px] md:max-w-full">
              <img
                src="/images/jardin_ingredients.png"
                alt="Hermes Perfume Scent Slices"
                className="w-full h-auto object-cover filter saturate-[1.05]"
              />

              {/* Hover Highlight Overlay */}
              <div 
                className={`absolute left-0 w-full bg-white/10 backdrop-brightness-[1.12] border-y border-white/40 transition-all duration-500 pointer-events-none ${
                  activeNoteId === 'top' ? 'top-0 h-[33.3%]' :
                  activeNoteId === 'heart' ? 'top-[33.3%] h-[33.3%]' :
                  'top-[66.6%] h-[33.3%]'
                }`}
              />

              {/* Hotspot triggers on the image */}
              <div 
                onClick={() => setActiveNoteId('top')} 
                className="absolute top-0 left-0 w-full h-[33.3%] cursor-pointer"
                title="Top Notes"
              />
              <div 
                onClick={() => setActiveNoteId('heart')} 
                className="absolute top-[33.3%] left-0 w-full h-[33.3%] cursor-pointer"
                title="Heart Notes"
              />
              <div 
                onClick={() => setActiveNoteId('base')} 
                className="absolute top-[66.6%] left-0 w-full h-[33.3%] cursor-pointer"
                title="Base Notes"
              />
            </div>

            {/* Graphic label */}
            <span className="absolute bottom-3 right-4 font-sans text-[9px] tracking-widest text-white/50 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
              TOUCH LAYERS TO EXPLORE
            </span>
          </div>

          {/* Right Column: Interaction Controls & Copy */}
          <div className="flex flex-col lg:col-span-7 order-1 lg:order-2 text-left fade-in">
            {/* Note Selector Tabs */}
            <div className="flex border-b border-hermes-sand/50 pb-4 mb-8">
              {scentNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={`flex-1 pb-4 text-center font-sans text-xs font-semibold tracking-widest transition-all duration-300 relative ${
                    activeNoteId === note.id 
                      ? 'text-hermes-orange' 
                      : 'text-hermes-charcoal/40 hover:text-hermes-charcoal'
                  }`}
                >
                  {note.id.toUpperCase()} NOTES
                  {activeNoteId === note.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-hermes-orange transition-all duration-300" />
                  )}
                </button>
              ))}
            </div>

            {/* Note Information Card */}
            <div className="min-h-[280px] flex flex-col justify-between">
              <div>
                <span className="font-sans text-[11px] font-bold tracking-[0.25em] text-hermes-sage uppercase">
                  {activeNote.title}
                </span>
                <h3 className="mt-2 font-serif text-3xl font-light text-hermes-charcoal md:text-4xl leading-tight">
                  {activeNote.subTitle}
                </h3>
                <p className="mt-2 font-sans text-xs font-medium tracking-wide text-hermes-charcoal/50 italic">
                  {activeNote.chineseTitle}
                </p>

                <p className="mt-6 font-sans text-sm font-light leading-relaxed text-hermes-charcoal/70 max-w-xl">
                  {activeNote.description}
                </p>
              </div>

              {/* Ingredient Badges */}
              <div className="mt-8 pt-6 border-t border-hermes-sand/20">
                <p className="font-sans text-[10px] font-bold tracking-widest text-hermes-charcoal/40 mb-3 uppercase">
                  Featured Notes
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeNote.ingredients.map((ingredient, i) => (
                    <span 
                      key={i} 
                      className="rounded-full bg-hermes-sand/40 border border-hermes-sand px-4 py-1.5 font-sans text-xs text-hermes-charcoal/80 font-medium"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
