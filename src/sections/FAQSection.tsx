import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Quanto tempo demora a entrega?',
    answer: 'A maioria dos itens é entregue automaticamente em poucos minutos após a confirmação do pagamento. Em casos raros, pode levar até 15 minutos dependendo da carga do servidor.',
  },
  {
    question: 'O que preciso para receber minha compra?',
    answer: 'Você precisará fornecer seu ID do FiveM e conectar sua conta do Discord durante o checkout. Isso garante que seus itens sejam entregues ao jogador correto.',
  },
  {
    question: 'Posso pedir reembolso?',
    answer: 'Todas as vendas são finais para itens digitais. Não oferecemos reembolsos após os itens terem sido entregues. Entre em contato com o suporte se tiver algum problema.',
  },
  {
    question: 'Minhas informações de pagamento estão seguras?',
    answer: 'Sim, usamos criptografia padrão da indústria e processadores de pagamento seguros. Nunca armazenamos suas informações de cartão de crédito em nossos servidores.',
  },
  {
    question: 'Quais métodos de pagamento são aceitos?',
    answer: 'Atualmente aceitamos PIX (Brasil) e pagamentos com cartão de crédito. Mais opções de pagamento serão adicionadas em breve.',
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.faq-header',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            '.faq-accordion',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-midnight-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="faq-header text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground">
            Tem dúvidas? Temos respostas.
          </p>
        </div>

        <Accordion type="single" collapsible className="faq-accordion opacity-0">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
              <AccordionTrigger className="text-left text-foreground hover:text-primary py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
