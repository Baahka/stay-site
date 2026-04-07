import { Menu, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import { CartDrawer } from '@/components/CartDrawer';

export function Navigation() {
  const { setCurrentPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Loja', page: 'shop' as const },
    { label: 'Suporte', page: 'home' as const, section: 'support' },
    { label: 'Discord', page: 'home' as const, external: 'https://discord.gg/UDrM8bTrrU' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.external) {
      window.open(link.external, '_blank');
      return;
    }
    
    if (link.section) {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(link.section!);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setCurrentPage(link.page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2"
          >
            <span className="text-xl font-display font-bold text-foreground">
              Stay<span className="text-primary">RP</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <CartDrawer />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
