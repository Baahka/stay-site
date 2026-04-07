import { ArrowRight, Zap, Gauge, Settings } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { getFeaturedProducts } from '@/data/products';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroSection() {
  const { setCurrentPage, addToCart, setSelectedProduct, setCartOpen } = useApp();
  const featuredProduct = getFeaturedProducts()[0];
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        '.hero-title',
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.hero-subtitle',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-cta',
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.6 }
      );
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', delay: 0.7 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (featuredProduct) {
      addToCart(featuredProduct);
      setCartOpen(true);
    }
  };

  const handleCardClick = () => {
    if (featuredProduct) {
      setSelectedProduct(featuredProduct);
      setCurrentPage('product');
    }
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_city_bg.jpg"
          alt="Cidade Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/50 to-midnight" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-transparent to-midnight/80" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4">
            Stay<span className="text-primary">RP</span>
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Compre benefícios e eleve sua experiência. O melhor marketplace de doações para GTA RP.
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="hero-cta btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Ver Loja</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Featured Product Card */}
        {featuredProduct && (
          <div
            ref={cardRef}
            onClick={handleCardClick}
            className="relative max-w-4xl mx-auto bg-card/90 backdrop-blur-md rounded-2xl overflow-hidden border border-border shadow-card cursor-pointer card-hover"
          >
            {/* Card Background */}
            <div className="absolute inset-0 z-0">
              <img
                src={featuredProduct.image || '/images/product_pack_1.jpg'}
                alt={featuredProduct.name}
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
            </div>

            {/* Card Content */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="lg:w-1/2">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                    Destaque
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
                    {featuredProduct.name}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {featuredProduct.description}
                  </p>
                  <p className="text-2xl font-bold text-primary mb-6">
                    {formatPrice(featuredProduct.price)}
                  </p>
                  <button
                    onClick={handleBuyNow}
                    className="btn-primary"
                  >
                    Comprar Agora
                  </button>
                </div>

                {/* Specs */}
                {featuredProduct.specs && (
                  <div className="lg:w-1/2 flex items-center justify-center lg:justify-end">
                    <div className="grid grid-cols-3 gap-4 sm:gap-6">
                      {featuredProduct.specs.map((spec, i) => (
                        <div key={i} className="text-center p-3 sm:p-4 bg-secondary/80 rounded-xl">
                          <div className="flex items-center justify-center mb-2">
                            {i === 0 && <Zap className="w-5 h-5 text-primary" />}
                            {i === 1 && <Gauge className="w-5 h-5 text-primary" />}
                            {i === 2 && <Settings className="w-5 h-5 text-primary" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{spec.label}</p>
                          <p className="text-sm font-semibold text-foreground">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
