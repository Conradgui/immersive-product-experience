
export default function HeroSection() {
  return (
    <section id="inspiration" className="relative overflow-hidden bg-gradient-to-b from-hermes-cream to-hermes-sand/20 py-16 md:py-24">
      {/* Background watercolor circles for organic texture */}
      <div className="absolute top-[10%] left-[5%] h-72 w-72 rounded-full bg-hermes-sage/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] h-96 w-96 rounded-full bg-hermes-orange/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Text Column */}
          <div className="flex flex-col items-start text-left lg:col-span-7 fade-in">
            <span className="font-sans text-[11px] font-bold tracking-[0.3em] text-hermes-orange mb-3">
              LES JARDINS COLLECTION
            </span>
            <h1 className="font-serif text-5xl font-light tracking-wide text-hermes-charcoal sm:text-6xl md:text-7xl leading-tight">
              Un Jardin<br />
              <span className="italic text-hermes-olive">sur le Nil</span>
            </h1>
            <p className="mt-2 font-sans text-xs font-semibold tracking-[0.2em] text-hermes-sage">
              EAU DE TOILETTE
            </p>

            {/* Ellena Quote Box */}
            <div className="mt-8 border-l border-hermes-orange/45 pl-6">
              <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-hermes-olive/90">
                “A new and rather unusual concept of freshness; green and vegetal scents; the smell of water and sand.”
              </p>
              <p className="mt-3 font-sans text-[11px] font-bold tracking-widest text-hermes-charcoal/60">
                — JEAN-CLAUDE ELLENA, PERFUMER-COMPOSER
              </p>
            </div>

            {/* Description Text */}
            <p className="mt-8 max-w-xl font-sans text-sm font-light leading-relaxed text-hermes-charcoal/70">
              Un Jardin sur le Nil is an impressionistic stroll through the island-gardens on the Nile at Aswan, the starting point for a new olfactory adventure. Green mango, lotus, calamus and sycamore wood all lie at the heart of this refreshing ode.
            </p>

            {/* Interactive Badge */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#scent-journey"
                className="rounded-full bg-hermes-olive px-8 py-3.5 font-sans text-xs font-semibold tracking-widest text-white transition-all duration-300 hover:bg-hermes-orange hover:shadow-lg hover:shadow-hermes-orange/20"
              >
                THE SCENT JOURNEY
              </a>
              <a
                href="#collection"
                className="rounded-full border border-hermes-charcoal/20 bg-transparent px-8 py-3.5 font-sans text-xs font-semibold tracking-widest text-hermes-charcoal transition-all duration-300 hover:border-hermes-charcoal hover:bg-hermes-charcoal/5"
              >
                VIEW THE ESSENTIALS
              </a>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative flex justify-center lg:col-span-5 fade-in">
            {/* Elegant organic background container */}
            <div className="absolute inset-0 m-auto h-[320px] w-[320px] sm:h-[400px] sm:w-[400px] rounded-full bg-gradient-to-tr from-hermes-sage/20 to-transparent blur-2xl -z-10" />
            
            {/* Scent visualizer badge overlay */}
            <div className="liquid-glass absolute left-4 top-1/4 z-10 hidden rounded-2xl p-4 md:block max-w-[180px]">
              <p className="font-sans text-[10px] font-bold tracking-wider text-hermes-sage">
                OLFACTORY FAMILY
              </p>
              <p className="font-serif text-lg italic text-hermes-charcoal">
                Green, Woody
              </p>
            </div>

            <div className="liquid-glass absolute right-4 bottom-1/4 z-10 hidden rounded-2xl p-4 md:block max-w-[180px]">
              <p className="font-sans text-[10px] font-bold tracking-wider text-hermes-orange">
                KEYNOTE
              </p>
              <p className="font-serif text-lg italic text-hermes-charcoal">
                Green Mango & Lotus
              </p>
            </div>

            {/* Main Bottle Image */}
            <div className="relative group transition-transform duration-500 hover:scale-[1.03]">
              <img
                src="/images/jardin_bottle_front.png"
                alt="Un Jardin Sur Le Nil Perfume Bottle"
                className="h-[380px] w-auto sm:h-[480px] object-contain drop-shadow-[0_20px_40px_rgba(61,74,62,0.15)] filter saturate-[1.05]"
              />
              
              {/* Soft decorative shadow at the base */}
              <div className="mx-auto -mt-6 h-6 w-3/4 rounded-full bg-hermes-olive/10 blur-md" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
