import { ArrowLeft, ShoppingCart, Check, Zap, Gauge, Settings, Package } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export function ProductPage() {
  const { selectedProduct, setCurrentPage, addToCart } = useApp();
  const [added, setAdded] = useState(false);

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Produto não encontrado</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="btn-primary mt-4"
          >
            Voltar à Loja
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct);
    setCurrentPage('checkout');
  };

  // Get related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 3);

  const getCategoryIcon = () => {
    switch (selectedProduct.category) {
      case 'vehicles':
        return <Zap className="w-5 h-5" />;
      case 'houses':
        return <Package className="w-5 h-5" />;
      case 'coins':
        return <Gauge className="w-5 h-5" />;
      default:
        return <Settings className="w-5 h-5" />;
    }
  };

  const getCategoryName = () => {
    switch (selectedProduct.category) {
      case 'vehicles':
        return 'Veículos';
      case 'houses':
        return 'Casas';
      case 'coins':
        return 'Coins';
      default:
        return 'Pacotes';
    }
  };

  return (
    <div className="min-h-screen bg-midnight pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => setCurrentPage('shop')}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à Loja</span>
        </button>

        {/* Product details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image */}
          <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-border">
            <img
              src={selectedProduct.image || '/images/product_pack_1.jpg'}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent" />
            
            {selectedProduct.featured && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                Destaque
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                {getCategoryIcon()}
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                {getCategoryName()}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {selectedProduct.name}
            </h1>

            <p className="text-2xl font-bold text-primary mb-6">
              {formatPrice(selectedProduct.price)}
            </p>

            <p className="text-muted-foreground mb-8">
              {selectedProduct.description}
            </p>

            {/* Specs */}
            {selectedProduct.specs && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-4">Especificações</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedProduct.specs.map((spec, i) => (
                    <div key={i} className="p-4 bg-secondary rounded-xl text-center">
                      <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
                      <p className="text-sm font-semibold text-foreground">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all ${
                  added
                    ? 'bg-primary/20 text-primary border border-primary'
                    : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Adicionado ao Carrinho</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-primary"
              >
                Comprar Agora
              </button>
            </div>

            {/* Trust info */}
            <div className="flex items-center space-x-4 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Check className="w-4 h-4 text-primary" />
                <span>Entrega instantânea</span>
              </span>
              <span className="flex items-center space-x-1">
                <Check className="w-4 h-4 text-primary" />
                <span>Pagamento seguro</span>
              </span>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Você Também Pode Gostar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="default" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
