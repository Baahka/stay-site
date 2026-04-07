import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, Ticket } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CartDrawer() {
  const {
    cart,
    removeFromCart,
    cartTotal,
    cartCount,
    setCurrentPage,
    updateCartItemQuantity,
    couponCodeInput,
    setCouponCodeInput,
    applyCoupon,
    appliedCoupon,
    couponError,
    discountAmount,
    finalTotal,
    clearCoupon,
    isCartOpen,
    setCartOpen,
  } = useApp();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setCurrentPage('checkout');
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
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
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-muted-foreground min-w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
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
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value)}
                      placeholder="Cupom"
                      className="h-10"
                    />
                    <Button onClick={applyCoupon} variant="outline" className="h-10">
                      <Ticket className="w-4 h-4 mr-2" />
                      Aplicar
                    </Button>
                  </div>
                  {couponError && (
                    <p className="text-sm text-destructive">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary">Cupom {appliedCoupon} aplicado</span>
                      <button onClick={clearCoupon} className="text-muted-foreground hover:text-foreground transition-colors">
                        Remover
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Desconto</span>
                    <span className="text-foreground">- {formatPrice(discountAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-lg font-semibold text-primary">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full btn-primary"
                  disabled={cart.length === 0}
                >
                  Finalizar Compra
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
