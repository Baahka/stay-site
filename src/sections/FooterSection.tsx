import { ShoppingBag, MessageCircle, FileText, Shield } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function FooterSection() {
  const { setCurrentPage } = useApp();

  const footerLinks = [
    { label: 'Loja', action: () => setCurrentPage('shop'), icon: ShoppingBag },
    { label: 'Suporte', action: () => {
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, icon: MessageCircle },
    { label: 'Termos', action: () => {}, icon: FileText },
    { label: 'Privacidade', action: () => {}, icon: Shield },
  ];

  return (
    <footer className="bg-[#05070D] border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo */}
          <div>
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-2xl font-display font-bold text-foreground"
            >
              Stay<span className="text-primary">RP</span>
            </button>
            <p className="text-sm text-muted-foreground mt-2">
              O melhor marketplace de doações para GTA RP
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Itens digitais. Entrega automática. Não reembolsável.
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Stay RP. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
