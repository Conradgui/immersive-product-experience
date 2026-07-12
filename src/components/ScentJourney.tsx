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
    title: 'Olfactory Journey / I',
    subTitle: 'Green Mango & Grapefruit',
    chineseTitle: '青芒果、葡萄柚 (伴随番茄茎与胡萝卜清香)',
    ingredients: ['Green Mango', 'Grapefruit', 'Tomato Stem', 'Carrot'],
    description: 'An intense, mouth-watering freshness. The stroll opens with the green, tart botanical pulp of green mango, heightened by the sharp effervescence and soft bitterness of grapefruit, completed by a snippet of tomato stem.',
    highlightClass: 'top-0 h-1/3'
  },
  {
    id: 'heart',
    title: 'Olfactory Journey / II',
    subTitle: 'Lotus & Calamus',
    chineseTitle: '尼罗河莲花、菖蒲',
    ingredients: ['Lotus', 'Calamus', 'Bitter Orange'],
    description: 'The translucent core of the river journey. Watery and delicate, the lotus brings a soft floral sweetness (reminiscent of peony and hyacinth) that floats elegantly alongside the grassy greenness of calamus reeds.',
    highlightClass: 'top-1/3 h-1/3'
  },
  {
    id: 'base',
    title: 'Olfactory Journey / III',
    subTitle: 'Sycamore Wood & Incense',
    chineseTitle: '槭木、焚香',
    ingredients: ['Sycamore Wood', 'Incense', 'Iris', 'Musk'],
    description: 'A quiet, mineral dry-down. The fragrance settles into the dry woody breath of sycamores and the mineral vibration of cool incense smoke, leaving a soft, powdery and musky texture on the skin like river sand.',
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
          
          {/* Left Column: Dynamic Hand-drawn Sketch Visual */}
          <div className="relative flex justify-center lg:col-span-5 order-2 lg:order-1 fade-in">
            <div className="w-full aspect-square max-w-[360px] rounded-2xl bg-gradient-to-tr from-hermes-sand/15 to-transparent border border-hermes-sand/20 flex items-center justify-center gap-6 relative p-8 shadow-[0_15px_40px_rgba(61,74,62,0.06)] overflow-hidden">
              
              {/* Dynamic Watercolor Smudge Backgrounds based on active tab */}
              {activeNoteId === 'top' && (
                <>
                  <div className="absolute w-24 h-24 bg-[#a4c986]/10 rounded-full filter blur-2xl left-[20%] top-[25%]" />
                  <div className="absolute w-24 h-24 bg-[#f37021]/10 rounded-full filter blur-2xl right-[20%] bottom-[25%]" />
                </>
              )}
              {activeNoteId === 'heart' && (
                <>
                  <div className="absolute w-24 h-24 bg-[#6eaca8]/10 rounded-full filter blur-2xl left-[20%] top-[25%]" />
                  <div className="absolute w-24 h-24 bg-[#8a9a86]/10 rounded-full filter blur-2xl right-[20%] bottom-[25%]" />
                </>
              )}
              {activeNoteId === 'base' && (
                <>
                  <div className="absolute w-24 h-24 bg-[#c5b0d5]/10 rounded-full filter blur-2xl left-[20%] top-[25%]" />
                  <div className="absolute w-24 h-24 bg-[#d3b88e]/10 rounded-full filter blur-2xl right-[20%] bottom-[25%]" />
                </>
              )}

              {/* Dynamic Sketches */}
              {activeNoteId === 'top' && (
                <div className="flex items-center gap-6 animate-fade-in">
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-hermes-olive/60 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round">
                      <path d="M50,16 C25,26 20,66 40,86 C55,96 80,91 85,66 C90,41 70,26 50,16 Z" />
                      <path d="M50,16 C48,11 42,9 35,13" />
                      <path d="M50,16 C58,9 72,13 70,23 C60,26 54,21 50,16 Z" />
                    </svg>
                    <span className="font-serif italic text-[10px] text-hermes-olive/70 mt-2 font-medium tracking-wide">Mangue Verte</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-hermes-orange/60 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round">
                      <circle cx="50" cy="50" r="38" />
                      <circle cx="50" cy="50" r="34" strokeDasharray="3,3" />
                      <path d="M50,50 L50,12 M50,50 L77,27 M50,50 L77,73 M50,50 L50,88 M50,50 L23,73 M50,50 L23,27" />
                      <circle cx="50" cy="50" r="3" className="fill-hermes-orange/10" />
                    </svg>
                    <span className="font-serif italic text-[10px] text-hermes-orange/70 mt-2 font-medium tracking-wide">Pamplemousse</span>
                  </div>
                </div>
              )}

              {activeNoteId === 'heart' && (
                <div className="flex items-center gap-6 animate-fade-in">
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-hermes-olive/60 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round">
                      <path d="M50,22 C45,42 22,62 50,82 C78,62 55,42 50,22 Z" />
                      <path d="M50,38 C35,53 12,68 36,80 C48,73 48,73 50,82" />
                      <path d="M50,38 C65,53 88,68 64,80 C52,73 52,73 50,82" />
                      <path d="M12,82 C32,90 68,90 88,82" />
                    </svg>
                    <span className="font-serif italic text-[10px] text-hermes-olive/70 mt-2 font-medium tracking-wide">Lotus</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-hermes-olive/50 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round">
                      <path d="M30,88 C34,58 44,33 64,12" />
                      <path d="M32,88 C42,63 58,43 75,28" />
                      <path d="M50,88 C50,68 45,53 35,38" />
                      <path d="M42,63 C45,48 52,38 60,33" />
                      <path d="M35,68 C28,58 22,53 15,48" />
                    </svg>
                    <span className="font-serif italic text-[10px] text-hermes-olive/70 mt-2 font-medium tracking-wide">Calamus</span>
                  </div>
                </div>
              )}

              {activeNoteId === 'base' && (
                <div className="flex items-center gap-6 animate-fade-in">
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-hermes-charcoal/40 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round">
                      <path d="M50,82 C45,67 55,52 45,37 C35,22 55,12 50,2" />
                      <path d="M40,82 C36,72 43,62 36,52 C28,39 44,27 38,15" />
                      <path d="M60,82 C64,72 57,62 64,52 C72,39 56,27 62,15" />
                    </svg>
                    <span className="font-serif italic text-[10px] text-hermes-charcoal/60 mt-2 font-medium tracking-wide">Encens</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-hermes-charcoal/50 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round">
                      <path d="M12,78 C32,68 62,53 82,43" />
                      <path d="M42,63 C52,48 65,43 69,30" />
                      <path d="M58,56 C60,46 53,36 46,30" />
                      <path d="M82,43 C87,38 89,28 82,23 C75,28 77,38 82,43 Z" />
                      <path d="M69,30 C75,26 77,16 69,10 C62,16 64,26 69,30 Z" />
                      <path d="M46,30 C40,26 38,16 46,10 C53,16 50,26 46,30 Z" />
                    </svg>
                    <span className="font-serif italic text-[10px] text-hermes-charcoal/70 mt-2 font-medium tracking-wide">Bois de Sycomore</span>
                  </div>
                </div>
              )}
            </div>
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
                  {note.title.toUpperCase()}
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
                  EXPLORE THE FRAGRANCE
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
                  {activeNote.ingredients.map((ingredient, i) => {
                    const isCore = ['Green Mango', 'Grapefruit', 'Lotus', 'Calamus', 'Sycamore Wood', 'Incense'].includes(ingredient);
                    return (
                      <span 
                        key={i} 
                        className={`rounded-full px-4 py-1.5 font-sans text-xs font-medium transition-colors duration-300 ${
                          isCore 
                            ? 'bg-hermes-sand/40 border border-hermes-sand text-hermes-charcoal/80' 
                            : 'bg-transparent border border-dashed border-hermes-sand text-hermes-charcoal/45'
                        }`}
                      >
                        {ingredient}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
