import { ShoppingCart, Check } from 'lucide-react';
import type { Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'compact';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addToCart, setSelectedProduct, setCurrentPage } = useApp();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleClick = () => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  if (variant === 'featured') {
    return (
      <div 
        onClick={handleClick}
        className="group relative bg-card rounded-2xl overflow-hidden border border-border shadow-card cursor-pointer card-hover"
      >
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image || '/images/product_pack_1.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          
          {product.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              Destaque
            </span>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {product.category === 'vehicles' ? 'Veículos' : 
                 product.category === 'houses' ? 'Casas' : 
                 product.category === 'coins' ? 'Coins' : 'Pacotes'}
              </p>
              <h3 className="text-xl font-display font-bold text-foreground">{product.name}</h3>
            </div>
            <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
          </div>
          
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{product.description}</p>
          
          {product.specs && (
            <div className="flex items-center space-x-4 mt-4">
              {product.specs.slice(0, 3).map((spec, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="text-sm font-medium text-foreground">{spec.value}</p>
                </div>
              ))}
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            className={`w-full mt-6 py-3 px-4 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all ${
              added 
                ? 'bg-primary/20 text-primary border border-primary' 
                : 'bg-primary text-primary-foreground hover:glow-primary'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Adicionar ao Carrinho</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={handleClick}
        className="group relative bg-card rounded-xl overflow-hidden border border-border cursor-pointer card-hover"
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={product.image || '/images/product_pack_1.jpg'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground truncate">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-primary font-bold">{formatPrice(product.price)}</span>
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-full transition-all ${
                added 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="group relative bg-card rounded-2xl overflow-hidden border border-border cursor-pointer card-hover"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image || '/images/product_pack_1.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        
        {product.featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            Destaque
          </span>
        )}
      </div>
      
      <div className="p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category === 'vehicles' ? 'Veículos' : 
           product.category === 'houses' ? 'Casas' : 
           product.category === 'coins' ? 'Coins' : 'Pacotes'}
        </p>
        <h3 className="text-lg font-display font-bold text-foreground">{product.name}</h3>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            className={`py-2 px-4 rounded-full text-sm font-semibold flex items-center space-x-2 transition-all ${
              added 
                ? 'bg-primary/20 text-primary border border-primary' 
                : 'bg-primary text-primary-foreground hover:glow-primary'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Adicionado</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
