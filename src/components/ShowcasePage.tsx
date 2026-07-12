import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ShowcasePageProps {
  onNavToDetail: () => void;
}

export default function ShowcasePage({ onNavToDetail }: ShowcasePageProps) {
  // Track scroll progress of the window (global scroll progress of this full-page 500vh view)
  const { scrollYProgress } = useScroll();

  // 1. SCROLL TIMING CONTROLS

  // Perfume Bottle Opacity and Timing (dissolves between 0.28 and 0.34)
  const bottleOpacity = useTransform(scrollYProgress, [0, 0.28, 0.34], [1, 1, 0], { clamp: true });
  
  // Chromatic Aberration X-Offset Bleed (Orange shifts Left, Blue shifts Right)
  const redBleedOffset = useTransform(scrollYProgress, [0.28, 0.34], [0, -28], { clamp: true });
  const blueBleedOffset = useTransform(scrollYProgress, [0.28, 0.34], [0, 28], { clamp: true });

  // Focus Opacity for Narrative Text Blocks (Left & Right Columns)
  const card1Opacity = useTransform(scrollYProgress, [0, 0.06, 0.18], [1, 1, 0.15], { clamp: true });
  const card2Opacity = useTransform(scrollYProgress, [0.06, 0.18, 0.30, 0.42], [0.15, 1, 1, 0.15], { clamp: true });
  const card3Opacity = useTransform(scrollYProgress, [0.30, 0.42, 0.54, 0.66], [0.15, 1, 1, 0.15], { clamp: true });
  const card4Opacity = useTransform(scrollYProgress, [0.54, 0.66, 0.78, 0.90], [0.15, 1, 1, 0.15], { clamp: true });
  const card5Opacity = useTransform(scrollYProgress, [0.78, 0.90, 1.0], [0.15, 1, 1], { clamp: true });

  // 4. WATERCOLOR SKETCHES CONTAINER OPACITY (Fades previous sketches out to prevent overlapping)
  const topNotesOpacity = useTransform(scrollYProgress, [0.30, 0.42, 0.54, 0.66], [0, 1, 1, 0], { clamp: true });
  const heartNotesOpacity = useTransform(scrollYProgress, [0.54, 0.66, 0.78, 0.90], [0, 1, 1, 0], { clamp: true });
  const baseNotesOpacity = useTransform(scrollYProgress, [0.78, 0.90, 1.0], [0, 1, 1], { clamp: true });

  // 2. WATERCOLOR SKETCHES DYNAMIC DRAWING (Ink stroke outline & smudge bloom)
  
  // Top Notes sketches (Mangue Verte & Pamplemousse)
  const topNotesPathLength = useTransform(scrollYProgress, [0.30, 0.42], [0, 1], { clamp: true });
  const topNotesSmudgeScale = useTransform(scrollYProgress, [0.30, 0.42], [0.4, 1.0], { clamp: true });
  const topNotesSmudgeOpacity = useTransform(scrollYProgress, [0.30, 0.42, 0.54, 0.66], [0, 0.35, 0.35, 0], { clamp: true });

  // Heart Notes sketches (Lotus du Nil & Calamus)
  const heartNotesPathLength = useTransform(scrollYProgress, [0.54, 0.66], [0, 1], { clamp: true });
  const heartNotesSmudgeScale = useTransform(scrollYProgress, [0.54, 0.66], [0.4, 1.0], { clamp: true });
  const heartNotesSmudgeOpacity = useTransform(scrollYProgress, [0.54, 0.66, 0.78, 0.90], [0, 0.35, 0.35, 0], { clamp: true });

  // Base Notes sketches (Encens Sacré & Bois de Sycomore)
  const baseNotesPathLength = useTransform(scrollYProgress, [0.78, 0.90], [0, 1], { clamp: true });
  const baseNotesSmudgeScale = useTransform(scrollYProgress, [0.78, 0.90], [0.4, 1.0], { clamp: true });
  const baseNotesSmudgeOpacity = useTransform(scrollYProgress, [0.78, 0.90, 1.0], [0, 0.35, 0.35], { clamp: true });

  // 3. BOTTLE MOTION CONSTANTS (Declared at top level to respect React Hook rules on unmount)
  const bottleRedFilter = useTransform(
    scrollYProgress, 
    [0.28, 0.34], 
    ['blur(0px) hue-rotate(0deg) saturate(1)', 'blur(10px) hue-rotate(-25deg) saturate(1.8)'],
    { clamp: true }
  );
  const bottleRedOpacity = useTransform(scrollYProgress, [0.28, 0.34], [1, 0], { clamp: true });

  const bottleBlueFilter = useTransform(
    scrollYProgress, 
    [0.28, 0.34], 
    ['blur(0px) hue-rotate(0deg) saturate(1)', 'blur(10px) hue-rotate(90deg) saturate(1.8)'],
    { clamp: true }
  );
  const bottleBlueOpacity = useTransform(scrollYProgress, [0.28, 0.34], [1, 0], { clamp: true });

  const bottleBaseFilter = useTransform(scrollYProgress, [0.28, 0.34], ['blur(0px)', 'blur(18px)'], { clamp: true });
  const bottleBaseScale = useTransform(scrollYProgress, [0, 0.28, 0.34], [1.0, 1.08, 0.85], { clamp: true });
  const bottleContainerVisibility = useTransform(scrollYProgress, (v) => v > 0.35 ? 'hidden' : 'visible');

  const grapefruitSmudgeOpacity = useTransform(
    scrollYProgress, 
    [0.30, 0.42, 0.54, 0.66], 
    [0, 0.30, 0.30, 0], 
    { clamp: true }
  );

  return (
    <div 
      className="relative w-full bg-hermes-cream text-hermes-charcoal"
      style={{ height: '500vh' }}
    >
      {/* Delicate Watermark Background (Stays sticky behind content) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.025]">
        <div className="sticky top-1/4 left-1/2 -translate-x-1/2 font-serif text-[20vw] whitespace-nowrap tracking-wider font-light text-hermes-olive">
          sur le Nil
        </div>
      </div>

      {/* Editorial Scrollytelling Columns Grid */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-[1.1fr_1.25fr_1.1fr] gap-10">
        
        {/* ================= LEFT COLUMN (SCROLLS NATURALLY) ================= */}
        <div className="relative flex flex-col">
          
          {/* Card 1: Introduction */}
          <motion.div 
            style={{ opacity: card1Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[10px] font-bold text-hermes-orange tracking-[0.25em] mb-2 uppercase">01 / CONCEPT</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-hermes-charcoal tracking-wide mb-6 leading-tight">
              An impressionistic <br />stroll beside a <span className="italic text-hermes-olive">river</span>
            </h2>
            <p className="text-hermes-charcoal/65 font-sans text-sm font-light leading-relaxed max-w-sm">
              Un Jardin sur le Nil is a sensory stroll beside a river, inspired by the light and nature of Aswan, and the eternal cycle of water. It offers an unusual definition of freshness.
            </p>
          </motion.div>

          {/* Card 2: The Journey */}
          <motion.div 
            style={{ opacity: card2Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[10px] font-bold text-hermes-orange tracking-[0.25em] mb-2 uppercase">02 / GENESIS</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-hermes-charcoal tracking-wide mb-6 leading-tight">
              Groves of <br /><span className="italic text-hermes-olive">Green Mango</span>
            </h2>
            <p className="text-hermes-charcoal/65 font-sans text-sm font-light leading-relaxed max-w-sm">
              During a research trip, perfumer Jean-Claude Ellena discovered wild green mangoes on the Nile banks. The fruit's fresh, tart, and vegetal smell laid the foundation for the fragrance.
            </p>
          </motion.div>

          {/* Card 3: Top Notes Story */}
          <motion.div 
            style={{ opacity: card3Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[10px] font-bold text-hermes-orange tracking-[0.25em] mb-2 uppercase">03 / JOURNEY I : GREEN & TART</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-hermes-charcoal tracking-wide mb-6 leading-tight">
              Zesty & <br /><span className="italic text-hermes-olive">vegetal citrus</span>
            </h2>
            <p className="text-hermes-charcoal/65 font-sans text-sm font-light leading-relaxed max-w-sm">
              At the first breath, an intense green freshness of green mango mixes with grapefruit. A snippet of tomato stem adds a crisp, botanical note to the morning river walk.
            </p>
          </motion.div>

          {/* Card 4: Heart Notes Story */}
          <motion.div 
            style={{ opacity: card4Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[10px] font-bold text-hermes-orange tracking-[0.25em] mb-2 uppercase">04 / JOURNEY II : AQUATIC & FLORAL</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-hermes-charcoal tracking-wide mb-6 leading-tight">
              Watery & <br /><span className="italic text-hermes-olive">floral lotus</span>
            </h2>
            <p className="text-hermes-charcoal/65 font-sans text-sm font-light leading-relaxed max-w-sm">
              The Nile Lotus—sacred flower of the pharaohs—blooms at the core. Its aquatic floral sweetness merges with calamus to evoke a quiet stroll beside the water.
            </p>
          </motion.div>

          {/* Card 5: Base Notes Story */}
          <motion.div 
            style={{ opacity: card5Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[10px] font-bold text-hermes-orange tracking-[0.25em] mb-2 uppercase">05 / JOURNEY III : WOODY & MINERAL</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-hermes-charcoal tracking-wide mb-6 leading-tight">
              Sycamore & <br /><span className="italic text-hermes-olive">mineral incense</span>
            </h2>
            <p className="text-hermes-charcoal/65 font-sans text-sm font-light leading-relaxed max-w-sm">
              The fragrance settles into the breath of sycamores and the mineral vibration of cool incense smoke. A soft, powdery and musky texture lingers like sun-warmed sand.
            </p>
          </motion.div>

        </div>

        {/* ================= MIDDLE COLUMN (STICKY CANVAS) ================= */}
        <div className="relative h-full">
          <div className="sticky top-0 h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden">
            
            {/* Top Indicator Line */}
            <div className="flex justify-between items-center z-30 font-sans text-[10px] font-bold tracking-[0.3em] text-hermes-sage/75 uppercase">
              <span>LES JARDINS COLLECTION</span>
              <span>UN JARDIN SUR LE NIL</span>
            </div>

            {/* Canvas Area */}
            <div className="relative flex-grow flex items-center justify-center min-h-0">
              
              {/* BOTTLE ZONE: Chromatic Aberration & Watercolor Bleed Layout */}
              <motion.div 
                style={{ visibility: bottleContainerVisibility }}
                className="w-[280px] h-[560px] relative z-20 flex items-center justify-center origin-center"
              >
                
                {/* 1. Red/Orange Bleed Layer (Shifts Left, blurs & dissolves) */}
                <motion.img 
                  src="/images/jardin_bottle_nobg.png" 
                  alt="Hermes Bottle Red Overlay" 
                  style={{
                    x: redBleedOffset,
                    filter: bottleRedFilter,
                    opacity: bottleRedOpacity,
                    mixBlendMode: 'multiply'
                  }}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />

                {/* 2. Blue/Green Bleed Layer (Shifts Right, blurs & dissolves) */}
                <motion.img 
                  src="/images/jardin_bottle_nobg.png" 
                  alt="Hermes Bottle Blue Overlay" 
                  style={{
                    x: blueBleedOffset,
                    filter: bottleBlueFilter,
                    opacity: bottleBlueOpacity,
                    mixBlendMode: 'multiply'
                  }}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />

                {/* 3. Base Image Layer (Blurs heavily & dissolves in place) */}
                <motion.img 
                  src="/images/jardin_bottle_nobg.png" 
                  alt="Hermes Jardin Perfume Bottle" 
                  style={{
                    opacity: bottleOpacity,
                    filter: bottleBaseFilter,
                    scale: bottleBaseScale
                  }}
                  className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(61,74,62,0.18)]"
                />
              </motion.div>

              {/* WATERCOLOR SKETCHES: Drawn Outline contour + smudge bloom */}
              
              {/* Stage 3 Sketches: Top Notes (Mangue Verte & Pamplemousse) */}
              <motion.div 
                style={{ opacity: topNotesOpacity }}
                className="absolute inset-0 flex items-center justify-center gap-10 md:gap-14 pointer-events-none z-10"
              >
                {/* Green Mango Sketch */}
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    style={{ 
                      scale: topNotesSmudgeScale, 
                      opacity: topNotesSmudgeOpacity,
                      top: '15px'
                    }}
                    className="absolute w-20 h-20 bg-[#a4c986] rounded-full filter blur-2xl mix-blend-multiply" 
                  />
                  <svg viewBox="0 0 100 100" className="w-28 h-28 stroke-hermes-olive/60 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round relative z-10">
                    <motion.path 
                      d="M50,16 C25,26 20,66 40,86 C55,96 80,91 85,66 C90,41 70,26 50,16 Z" 
                      pathLength={topNotesPathLength}
                    />
                    <motion.path 
                      d="M50,16 C48,11 42,9 35,13" 
                      pathLength={topNotesPathLength}
                    />
                    <motion.path 
                      d="M50,16 C58,9 72,13 70,23 C60,26 54,21 50,16 Z" 
                      pathLength={topNotesPathLength}
                    />
                  </svg>
                  <span className="font-serif italic text-[11px] text-hermes-olive/75 mt-1 font-medium tracking-wide">
                    Mangue Verte
                  </span>
                </div>
                
                {/* Grapefruit Sketch */}
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    style={{ 
                      scale: topNotesSmudgeScale, 
                      opacity: grapefruitSmudgeOpacity,
                      top: '15px'
                    }}
                    className="absolute w-20 h-20 bg-[#f37021] rounded-full filter blur-2xl mix-blend-multiply" 
                  />
                  <svg viewBox="0 0 100 100" className="w-28 h-28 stroke-hermes-orange/60 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round relative z-10">
                    <motion.circle cx="50" cy="50" r="38" pathLength={topNotesPathLength} />
                    <motion.circle cx="50" cy="50" r="34" strokeDasharray="3,3" pathLength={topNotesPathLength} />
                    <motion.path 
                      d="M50,50 L50,12 M50,50 L77,27 M50,50 L77,73 M50,50 L50,88 M50,50 L23,73 M50,50 L23,27" 
                      pathLength={topNotesPathLength}
                    />
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="3" 
                      className="fill-hermes-orange/10" 
                      style={{ opacity: topNotesPathLength }}
                    />
                  </svg>
                  <span className="font-serif italic text-[11px] text-hermes-orange/70 mt-1 font-medium tracking-wide">
                    Pamplemousse
                  </span>
                </div>
              </motion.div>

              {/* Stage 4 Sketches: Heart Notes (Lotus de Nil & Roseau Calamus) */}
              <motion.div 
                style={{ opacity: heartNotesOpacity }}
                className="absolute inset-0 flex items-center justify-center gap-10 md:gap-14 pointer-events-none z-10"
              >
                {/* Nile Lotus Sketch */}
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    style={{ 
                      scale: heartNotesSmudgeScale, 
                      opacity: heartNotesSmudgeOpacity,
                      top: '12px'
                    }}
                    className="absolute w-22 h-22 bg-[#6eaca8] rounded-full filter blur-2xl mix-blend-multiply" 
                  />
                  <svg viewBox="0 0 100 100" className="w-28 h-28 stroke-hermes-olive/60 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round relative z-10">
                    <motion.path 
                      d="M50,22 C45,42 22,62 50,82 C78,62 55,42 50,22 Z" 
                      pathLength={heartNotesPathLength}
                    />
                    <motion.path 
                      d="M50,38 C35,53 12,68 36,80 C48,73 48,73 50,82" 
                      pathLength={heartNotesPathLength}
                    />
                    <motion.path 
                      d="M50,38 C65,53 88,68 64,80 C52,73 52,73 50,82" 
                      pathLength={heartNotesPathLength}
                    />
                    <motion.path 
                      d="M12,82 C32,90 68,90 88,82" 
                      pathLength={heartNotesPathLength}
                    />
                  </svg>
                  <span className="font-serif italic text-[11px] text-hermes-olive/75 mt-1 font-medium tracking-wide">
                    Lotus du Nil
                  </span>
                </div>

                {/* Calamus Reeds Sketch */}
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    style={{ 
                      scale: heartNotesSmudgeScale, 
                      opacity: heartNotesSmudgeOpacity,
                      top: '8px'
                    }}
                    className="absolute w-18 h-24 bg-[#8a9a86] rounded-full filter blur-2xl mix-blend-multiply" 
                  />
                  <svg viewBox="0 0 100 100" className="w-28 h-28 stroke-hermes-olive/50 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round relative z-10">
                    <motion.path d="M30,88 C34,58 44,33 64,12" pathLength={heartNotesPathLength} />
                    <motion.path d="M32,88 C42,63 58,43 75,28" pathLength={heartNotesPathLength} />
                    <motion.path d="M50,88 C50,68 45,53 35,38" pathLength={heartNotesPathLength} />
                    <motion.path d="M42,63 C45,48 52,38 60,33" pathLength={heartNotesPathLength} />
                    <motion.path d="M35,68 C28,58 22,53 15,48" pathLength={heartNotesPathLength} />
                  </svg>
                  <span className="font-serif italic text-[11px] text-hermes-olive/70 mt-1 font-medium tracking-wide">
                    Calamus
                  </span>
                </div>
              </motion.div>

              {/* Stage 5 Sketches: Base Notes (Encens Sacré & Bois de Sycomore) */}
              <motion.div 
                style={{ opacity: baseNotesOpacity }}
                className="absolute inset-0 flex items-center justify-center gap-10 md:gap-14 pointer-events-none z-10"
              >
                {/* Incense Smoke Sketch */}
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    style={{ 
                      scale: baseNotesSmudgeScale, 
                      opacity: baseNotesSmudgeOpacity,
                      top: '15px'
                    }}
                    className="absolute w-20 h-20 bg-[#c5b0d5] rounded-full filter blur-2xl mix-blend-multiply" 
                  />
                  <svg viewBox="0 0 100 100" className="w-28 h-28 stroke-hermes-charcoal/40 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round relative z-10">
                    <motion.path d="M50,82 C45,67 55,52 45,37 C35,22 55,12 50,2" pathLength={baseNotesPathLength} />
                    <motion.path d="M40,82 C36,72 43,62 36,52 C28,39 44,27 38,15" pathLength={baseNotesPathLength} />
                    <motion.path d="M60,82 C64,72 57,62 64,52 C72,39 56,27 62,15" pathLength={baseNotesPathLength} />
                  </svg>
                  <span className="font-serif italic text-[11px] text-hermes-charcoal/60 mt-1 font-medium tracking-wide">
                    Encens
                  </span>
                </div>

                {/* Sycamore Branch Sketch */}
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    style={{ 
                      scale: baseNotesSmudgeScale, 
                      opacity: baseNotesSmudgeOpacity,
                      top: '15px'
                    }}
                    className="absolute w-22 h-20 bg-[#d3b88e] rounded-full filter blur-2xl mix-blend-multiply" 
                  />
                  <svg viewBox="0 0 100 100" className="w-28 h-28 stroke-hermes-charcoal/50 fill-none stroke-[1.2] stroke-linecap-round stroke-linejoin-round relative z-10">
                    <motion.path d="M12,78 C32,68 62,53 82,43" pathLength={baseNotesPathLength} />
                    <motion.path d="M42,63 C52,48 65,43 69,30" pathLength={baseNotesPathLength} />
                    <motion.path d="M58,56 C60,46 53,36 46,30" pathLength={baseNotesPathLength} />
                    <motion.path d="M82,43 C87,38 89,28 82,23 C75,28 77,38 82,43 Z" pathLength={baseNotesPathLength} />
                    <motion.path d="M69,30 C75,26 77,16 69,10 C62,16 64,26 69,30 Z" pathLength={baseNotesPathLength} />
                    <motion.path d="M46,30 C40,26 38,16 46,10 C53,16 50,26 46,30 Z" pathLength={baseNotesPathLength} />
                  </svg>
                  <span className="font-serif italic text-[11px] text-hermes-charcoal/65 mt-1 font-medium tracking-wide">
                    Bois de Sycomore
                  </span>
                </div>
              </motion.div>

            </div>

            {/* Bottom Footer Details */}
            <div className="flex justify-between items-center z-30 font-sans text-[8px] font-semibold tracking-[0.25em] text-hermes-sage/75 uppercase border-t border-hermes-sand/50 pt-4">
              <span>PARFUMS-JARDINS COLLECTION SHOWCASE</span>
              <span>© {new Date().getFullYear()} HERMÈS. ALL RIGHTS RESERVED.</span>
            </div>

          </div>
        </div>

        {/* ================= RIGHT COLUMN (SCROLLS NATURALLY) ================= */}
        <div className="relative flex flex-col">
          
          {/* Card 1: Carriage Lantern Design */}
          <motion.div 
            style={{ opacity: card1Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[10px] font-bold text-hermes-orange tracking-[0.25em] mb-2 uppercase">DESIGNER / BOTTLE</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-hermes-charcoal tracking-wide mb-6 leading-tight">
              The Heritage <br />of the Lantern
            </h2>
            <p className="text-hermes-charcoal/65 font-sans text-sm font-light leading-relaxed max-w-sm">
              Designed by Fred Rawyler, the bottle's clean shape takes its cue from horse-drawn carriage lanterns. The green-to-transparent glass gradient mirrors the Nile banks.
            </p>
          </motion.div>

          {/* Card 2: Spray Detail */}
          <motion.div 
            style={{ opacity: card2Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[10px] font-bold text-hermes-orange tracking-[0.25em] mb-2 uppercase">OLFACTORY / RELEASE</span>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-hermes-charcoal tracking-wide mb-6 leading-tight">
              Breathe in the <br /><span className="italic text-hermes-olive">Nile Breeze</span>
            </h2>
            <p className="text-hermes-charcoal/65 font-sans text-sm font-light leading-relaxed max-w-sm">
              Uncapping the bottle releases the spray. The scent elements disperse like Aswan's humid river mist, launching a serene journey through gardens of sun and water.
            </p>
          </motion.div>

          {/* Card 3: Top Notes Breakdown */}
          <motion.div 
            style={{ opacity: card3Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[11px] font-bold text-hermes-orange tracking-[0.25em] mb-4 uppercase">OLFACTORY JOURNEY / I</span>
            <div className="border-l-2 border-hermes-orange/30 pl-5 space-y-6">
              <div className="space-y-1">
                <h4 className="font-sans text-[14px] font-bold text-hermes-charcoal tracking-widest uppercase">Green Mango // 青芒果</h4>
                <p className="text-[13.5px] text-hermes-charcoal/60 leading-relaxed font-light font-sans">An intense green freshness, blending tender shoots and fruity pulp.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-sans text-[14px] font-bold text-hermes-charcoal tracking-widest uppercase">Grapefruit // 葡萄柚</h4>
                <p className="text-[13.5px] text-hermes-charcoal/60 leading-relaxed font-light font-sans">A zesty, sparkling note that heightens the mango with sharp effervescence and soft bitterness.</p>
              </div>
              <div className="space-y-1 opacity-60">
                <h4 className="font-sans text-[12px] font-medium text-hermes-charcoal/80 tracking-widest uppercase">Tomato Stem // 番茄茎 (植物感)</h4>
                <p className="text-[12.5px] text-hermes-charcoal/50 leading-relaxed font-light font-sans">A snippet of green tomato stem adding a crisp, raw vegetal note.</p>
              </div>
              <div className="space-y-1 opacity-60">
                <h4 className="font-sans text-[12px] font-medium text-hermes-charcoal/80 tracking-widest uppercase">Carrot // 胡萝卜 (辅助气味)</h4>
                <p className="text-[12.5px] text-hermes-charcoal/50 leading-relaxed font-light font-sans">A crisp, root-like nuance blending into the green mango accord.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Heart Notes Breakdown */}
          <motion.div 
            style={{ opacity: card4Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[11px] font-bold text-hermes-orange tracking-[0.25em] mb-4 uppercase">OLFACTORY JOURNEY / II</span>
            <div className="border-l-2 border-hermes-orange/30 pl-5 space-y-6">
              <div className="space-y-1">
                <h4 className="font-sans text-[14px] font-bold text-hermes-charcoal tracking-widest uppercase">Lotus // 莲花</h4>
                <p className="text-[13.5px] text-hermes-charcoal/60 leading-relaxed font-light font-sans">A delicate, watery floral sweetness somewhere between peony and hyacinth, tinged with a subtle pink.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-sans text-[14px] font-bold text-hermes-charcoal tracking-widest uppercase">Calamus // 菖蒲</h4>
                <p className="text-[13.5px] text-hermes-charcoal/60 leading-relaxed font-light font-sans">A fragrant rush that adds a grassy greenness of wet stalks and clean river breezes.</p>
              </div>
              <div className="space-y-1 opacity-60">
                <h4 className="font-sans text-[12px] font-medium text-hermes-charcoal/80 tracking-widest uppercase">Bitter Orange // 苦橙 (辅助气味)</h4>
                <p className="text-[12.5px] text-hermes-charcoal/50 leading-relaxed font-light font-sans">A subtle bitter citrus tone supporting the brightness of the lotus.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Base Notes Breakdown & Button */}
          <motion.div 
            style={{ opacity: card5Opacity }}
            className="h-screen flex flex-col justify-center"
          >
            <span className="font-sans text-[11px] font-bold text-hermes-orange tracking-[0.25em] mb-4 uppercase">OLFACTORY JOURNEY / III</span>
            <div className="border-l-2 border-hermes-orange/30 pl-5 space-y-6 mb-7">
              <div className="space-y-1">
                <h4 className="font-sans text-[14px] font-bold text-hermes-charcoal tracking-widest uppercase">Sycamore Wood // 槭木</h4>
                <p className="text-[13.5px] text-hermes-charcoal/60 leading-relaxed font-light font-sans">The woody breath of tall, caressing trees, providing a dry and sheltering backdrop.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-sans text-[14px] font-bold text-hermes-charcoal tracking-widest uppercase">Incense // 焚香</h4>
                <p className="text-[13.5px] text-hermes-charcoal/60 leading-relaxed font-light font-sans">A cool fire of incense smoke, reminiscent of the mineral vibration of wet stones.</p>
              </div>
              <div className="space-y-1 opacity-60">
                <h4 className="font-sans text-[12px] font-medium text-hermes-charcoal/80 tracking-widest uppercase">Iris & Musk // 鸢尾与麝香 (感知质感)</h4>
                <p className="text-[12.5px] text-hermes-charcoal/50 leading-relaxed font-light font-sans">A soft, powdery and musky texture settling like dry river sand.</p>
              </div>
            </div>

            {/* Action button to explore full details */}
            <button 
              onClick={onNavToDetail}
              className="group flex items-center justify-between w-full max-w-[210px] border border-hermes-olive/25 hover:border-hermes-orange bg-transparent rounded-full px-6 py-3.5 font-sans text-[10.5px] font-bold tracking-widest text-hermes-olive hover:text-hermes-orange transition-all duration-300 cursor-pointer"
            >
              EXPLORE DETAIL 
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
