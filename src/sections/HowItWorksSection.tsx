import { ShoppingCart, CreditCard, Package, Check } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Escolha seu item',
    description: 'Navegue pela coleção e adicione itens ao carrinho.',
    icon: ShoppingCart,
  },
  {
    number: '02',
    title: 'Complete o pagamento',
    description: 'Pague com segurança com PIX ou cartão de crédito.',
    icon: CreditCard,
  },
  {
    number: '03',
    title: 'Receba automaticamente',
    description: 'Seus itens são entregues no jogo em minutos.',
    icon: Package,
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.hiw-header',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            '.hiw-step',
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
    <section ref={sectionRef} className="py-20 bg-midnight-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hiw-header text-center mb-16 opacity-0">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Como Funciona
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Obtenha seus itens em três passos simples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="hiw-step relative opacity-0"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                <div className="text-center">
                  {/* Step number circle */}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
                    <div className="absolute inset-2 rounded-full border border-primary/50" />
                    <div className="relative z-10 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust badge */}
        <div className="mt-16 flex items-center justify-center">
          <div className="flex items-center space-x-2 px-6 py-3 bg-secondary rounded-full border border-border">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Itens digitais. Entrega automática. Não reembolsável.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
