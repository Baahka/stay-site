import { Star, Quote } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Alex',
    role: 'Jogador',
    avatar: 'A',
    content: 'Entrega rápida, interface limpa e os carros são incríveis. Melhor loja de RP que já usei!',
    rating: 5,
  },
  {
    name: 'Sam',
    role: 'Jogador',
    avatar: 'S',
    content: 'O suporte me ajudou em minutos. A entrega automática é um diferencial.',
    rating: 5,
  },
  {
    name: 'Jordan',
    role: 'Jogador',
    avatar: 'J',
    content: 'Melhor loja de servidor RP que já usei. Sem complicações, tudo funciona perfeitamente.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.testimonials-header',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            '.testimonial-card',
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
        <div className="testimonials-header text-center mb-16 opacity-0">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            O que os Jogadores Dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de jogadores satisfeitos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-card rounded-2xl p-6 border border-border opacity-0"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
