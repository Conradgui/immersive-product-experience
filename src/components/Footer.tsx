
export default function Footer() {
  return (
    <footer className="border-t border-hermes-sand/40 bg-hermes-cream py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo Brand */}
          <div className="flex flex-col items-center md:items-start">
            <span className="font-sans text-sm font-bold tracking-[0.25em] text-hermes-charcoal">
              HERMÈS
            </span>
            <span className="font-sans text-[7px] font-medium tracking-[0.4em] text-hermes-sage -mt-0.5">
              PARIS
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-center">
            <a
              href="#inspiration"
              className="font-sans text-[10px] font-semibold tracking-widest text-hermes-charcoal/50 hover:text-hermes-orange transition-colors"
            >
              INSPIRATION
            </a>
            <a
              href="#scent-journey"
              className="font-sans text-[10px] font-semibold tracking-widest text-hermes-charcoal/50 hover:text-hermes-orange transition-colors"
            >
              THE JOURNEY
            </a>
            <a
              href="#collection"
              className="font-sans text-[10px] font-semibold tracking-widest text-hermes-charcoal/50 hover:text-hermes-orange transition-colors"
            >
              COLLECTION
            </a>
          </div>

          {/* Disclaimer / Credits */}
          <div className="text-center md:text-right">
            <p className="font-sans text-[10px] font-light text-hermes-charcoal/40">
              © {new Date().getFullYear()} Immersive Motion UI. Conceptual Showcase.
            </p>
          </div>
        </div>

        {/* Brand Disclaimer Notice */}
        <div className="mt-8 border-t border-hermes-sand/20 pt-6 text-center">
          <p className="mx-auto max-w-2xl font-sans text-[9px] font-light leading-relaxed text-hermes-charcoal/30">
            This project is an artistic web showcase design based on the Parfums-Jardins collection by Hermès. All trademarks, copyrights, and brand assets (including product names, imagery, and fragrance notes) belong to Hermès Paris.
          </p>
        </div>
      </div>
    </footer>
  );
}
