import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ScentJourney from './components/ScentJourney';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ShowcasePage from './components/ShowcasePage';

export default function App() {
  const [activePage, setActivePage] = useState<'showcase' | 'detail'>('showcase');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const timer = setTimeout(() => {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activePage]); // Re-observe when switching pages

  return (
    <div className="min-h-screen bg-hermes-cream flex flex-col justify-between selection:bg-hermes-sage/20 selection:text-hermes-charcoal">
      <div>
        {/* Header Navigation */}
        <Header activePage={activePage} onChangePage={setActivePage} />

        {/* Dynamic Page Rendering */}
        <AnimatePresence mode="wait">
          {activePage === 'showcase' ? (
            <ShowcasePage key="showcase" onNavToDetail={() => setActivePage('detail')} />
          ) : (
            <div key="detail" className="fade-in active">
              <main>
                {/* Hero Section */}
                <HeroSection />

                {/* Scent Journey Section */}
                <ScentJourney />

                {/* Product Collection Section */}
                <ProductGrid />
              </main>
              {/* Footer Details */}
              <Footer />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
