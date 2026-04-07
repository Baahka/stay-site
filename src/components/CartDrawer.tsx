import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const { cart, removeFromCart, cartTotal, cartCount, setCurrentPage } = useApp();

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card border-border">
        <SheetHeader>
          <SheetTitle className="text-foreground font-display">Seu Carrinho</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground mt-1">Adicione itens para começar</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center space-x-4 p-3 bg-secondary rounded-lg"
                  >
                    <img
                      src={item.product.image || '/images/product_pack_1.jpg'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground capitalize">
                        {item.product.category === 'vehicles' ? 'Veículos' : 
                         item.product.category === 'houses' ? 'Casas' : 
                         item.product.category === 'coins' ? 'Coins' : 'Pacotes'}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-semibold text-foreground">{formatPrice(cartTotal)}</span>
                </div>
                <SheetTrigger asChild>
                  <Button
                    onClick={handleCheckout}
                    className="w-full btn-primary"
                  >
                    Finalizar Compra
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </SheetTrigger>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
