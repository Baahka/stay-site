import { Home, Car, Coins, Package, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 'houses',
    name: 'Casas',
    description: 'Mansões modernas, propriedades frente-mar e esconderijos—mobiliados e prontos.',
    image: '/images/category_houses.jpg',
    icon: Home,
    cta: 'Ver Casas',
  },
  {
    id: 'vehicles',
    name: 'Veículos',
    description: 'Do dia a dia aos carros de pista—entregues na sua garagem.',
    image: '/images/category_vehicles.jpg',
    icon: Car,
    cta: 'Ver Veículos',
  },
  {
    id: 'coins',
    name: 'Coins',
    description: 'Recarregue rápido. Gaste livremente. Sem grind necessário.',
    image: '/images/category_coins.jpg',
    icon: Coins,
    cta: 'Comprar Coins',
  },
  {
    id: 'packs',
    name: 'Pacotes',
    description: 'Os melhores combos—carros, dinheiro e propriedade em uma oferta.',
    image: '/images/category_packs.jpg',
    icon: Package,
    cta: 'Ver Pacotes',
  },
];

export function CategoriesSection() {
  const { setCurrentPage } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      categories.forEach((_, index) => {
        const trigger = ScrollTrigger.create({
          trigger: `.category-card-${index}`,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              `.category-card-${index}`,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: index * 0.1 }
            );
          },
          once: true,
        });
        triggers.push(trigger);
      });
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setCurrentPage('shop');
    // Store selected category for filtering
    localStorage.setItem('selectedCategory', categoryId);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-midnight-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Navegar por Categoria
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encontre exatamente o que precisa para melhorar sua experiência de RP
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className={`category-card-${index} relative group overflow-hidden rounded-2xl border border-border cursor-pointer opacity-0`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-midnight/95 via-midnight/70 to-midnight/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full min-h-[280px]">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {category.name}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-6 flex-1 max-w-md">
                    {category.description}
                  </p>

                  <button className="inline-flex items-center space-x-2 text-primary font-semibold group/btn">
                    <span>{category.cta}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
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
