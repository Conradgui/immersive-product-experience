import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activePage: 'showcase' | 'detail';
  onChangePage: (page: 'showcase' | 'detail') => void;
}

export default function Header({ activePage, onChangePage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = (hash: string) => {
    setIsOpen(false);
    onChangePage('detail');
    // Allow state transition to render the detail page before scrolling
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hermes-sand/50 bg-hermes-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        {/* Brand Logo */}
        <div 
          onClick={() => onChangePage('showcase')}
          className="flex flex-col items-start cursor-pointer hover:opacity-85 transition-opacity"
        >
          <span className="font-sans text-lg font-bold tracking-[0.25em] text-hermes-charcoal md:text-xl">
            HERMÈS
          </span>
          <span className="font-sans text-[8px] font-medium tracking-[0.4em] text-hermes-sage md:text-[9px] -mt-1">
            PARIS
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-10 md:flex">
          <button
            onClick={() => handleNavLinkClick('#inspiration')}
            className="font-sans text-xs font-semibold tracking-widest text-hermes-charcoal/80 transition-colors duration-300 hover:text-hermes-orange cursor-pointer bg-transparent border-none"
          >
            THE INSPIRATION
          </button>
          <button
            onClick={() => handleNavLinkClick('#scent-journey')}
            className="font-sans text-xs font-semibold tracking-widest text-hermes-charcoal/80 transition-colors duration-300 hover:text-hermes-orange cursor-pointer bg-transparent border-none"
          >
            SCENT JOURNEY
          </button>
          <button
            onClick={() => handleNavLinkClick('#collection')}
            className="font-sans text-xs font-semibold tracking-widest text-hermes-charcoal/80 transition-colors duration-300 hover:text-hermes-orange cursor-pointer bg-transparent border-none"
          >
            THE COLLECTION
          </button>
        </nav>

        {/* Page Switch Toggle */}
        <div className="hidden md:flex rounded-full bg-hermes-sand/40 p-1 border border-hermes-sand/60">
          <button 
            onClick={() => onChangePage('showcase')}
            className={`rounded-full px-4 py-1.5 font-sans text-[9px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${
              activePage === 'showcase' 
                ? 'bg-hermes-olive text-white shadow-sm' 
                : 'text-hermes-charcoal/60 hover:text-hermes-charcoal'
            }`}
          >
            SHOWCASE
          </button>
          <button 
            onClick={() => onChangePage('detail')}
            className={`rounded-full px-4 py-1.5 font-sans text-[9px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${
              activePage === 'detail' 
                ? 'bg-hermes-olive text-white shadow-sm' 
                : 'text-hermes-charcoal/60 hover:text-hermes-charcoal'
            }`}
          >
            DETAIL
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden text-hermes-charcoal focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-t border-hermes-sand/50 bg-hermes-cream px-6 py-6 md:hidden">
          <nav className="flex flex-col space-y-5">
            <button
              onClick={() => handleNavLinkClick('#inspiration')}
              className="text-left font-sans text-sm font-semibold tracking-widest text-hermes-charcoal bg-transparent border-none cursor-pointer"
            >
              THE INSPIRATION
            </button>
            <button
              onClick={() => handleNavLinkClick('#scent-journey')}
              className="text-left font-sans text-sm font-semibold tracking-widest text-hermes-charcoal bg-transparent border-none cursor-pointer"
            >
              SCENT JOURNEY
            </button>
            <button
              onClick={() => handleNavLinkClick('#collection')}
              className="text-left font-sans text-sm font-semibold tracking-widest text-hermes-charcoal bg-transparent border-none cursor-pointer"
            >
              THE COLLECTION
            </button>
            <div className="flex rounded-full bg-hermes-sand/40 p-1 border border-hermes-sand/60 w-full mt-4">
              <button 
                onClick={() => { onChangePage('showcase'); setIsOpen(false); }}
                className={`flex-1 rounded-full py-2 font-sans text-[10px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                  activePage === 'showcase' ? 'bg-hermes-olive text-white' : 'text-hermes-charcoal/60'
                }`}
              >
                SHOWCASE
              </button>
              <button 
                onClick={() => { onChangePage('detail'); setIsOpen(false); }}
                className={`flex-1 rounded-full py-2 font-sans text-[10px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                  activePage === 'detail' ? 'bg-hermes-olive text-white' : 'text-hermes-charcoal/60'
                }`}
              >
                DETAIL
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
