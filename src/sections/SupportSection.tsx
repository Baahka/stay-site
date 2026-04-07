import { MessageCircle, Mail, Clock, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SupportSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.support-content',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
          );
          gsap.fromTo(
            '.support-cta',
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openDiscord = () => {
    window.open('https://discord.gg', '_blank');
  };

  return (
    <section id="support" ref={sectionRef} className="py-20 bg-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="support-content opacity-0">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Precisa de Ajuda?
            </h2>
            <p className="text-muted-foreground mb-8">
              Nossa equipe de suporte está aqui para ajudar com qualquer dúvida ou problema. 
              Geralmente respondemos em poucas horas.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Resposta Rápida</p>
                  <p className="text-sm text-muted-foreground">Geralmente em 2-4 horas</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Suporte Discord</p>
                  <p className="text-sm text-muted-foreground">Junte-se ao nosso servidor</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Suporte por E-mail</p>
                  <p className="text-sm text-muted-foreground">suporte@stayrp.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right CTA */}
          <div className="support-cta flex justify-center lg:justify-end opacity-0">
            <div className="bg-card rounded-2xl p-8 border border-border max-w-md w-full text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Junte-se ao nosso Discord
              </h3>
              <p className="text-muted-foreground mb-6">
                Obtenha suporte instantâneo e conecte-se com outros jogadores em nossa comunidade.
              </p>
              <button
                onClick={openDiscord}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <span>Abrir Discord</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
