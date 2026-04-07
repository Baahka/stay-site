import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FeaturedProductsSection() {
  const { setCurrentPage } = useApp();
  const featuredProducts = getFeaturedProducts();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.featured-header',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            '.featured-card',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.15, delay: 0.2 }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="featured-header flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 opacity-0">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
              Produtos em Destaque
            </h2>
            <p className="text-muted-foreground">
              Itens selecionados para a melhor experiência de RP
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="mt-4 sm:mt-0 btn-secondary"
          >
            Ver Todos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="featured-card opacity-0">
              <ProductCard product={product} variant="featured" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
