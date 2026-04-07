import { useState } from 'react';
import { ArrowLeft, Check, User, Truck, CreditCard, FileCheck, MessageCircle, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { CheckoutStep, UserInfo, DeliveryInfo, PaymentInfo, PaymentMethod } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const steps = [
  { number: 1, label: 'Dados Pessoais', icon: User },
  { number: 2, label: 'Entrega', icon: Truck },
  { number: 3, label: 'Pagamento', icon: CreditCard },
  { number: 4, label: 'Confirmar', icon: FileCheck },
];

export function CheckoutPage() {
  const { 
    cart, 
    cartTotal, 
    setCurrentPage, 
    currentStep, 
    setCurrentStep,
    userInfo,
    setUserInfo,
    deliveryInfo,
    setDeliveryInfo,
    paymentInfo,
    setPaymentInfo,
    createOrder,
    clearCart,
  } = useApp();

  const [showSuccess, setShowSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);

  // Form states
  const [personalForm, setPersonalForm] = useState<UserInfo>({
    fullName: userInfo?.fullName || '',
    email: userInfo?.email || '',
    cpf: userInfo?.cpf || '',
  });

  const [deliveryForm, setDeliveryForm] = useState<DeliveryInfo>({
    fivemId: deliveryInfo?.fivemId || '',
    discordConnected: deliveryInfo?.discordConnected || false,
    discordUsername: deliveryInfo?.discordUsername || '',
  });

  const [paymentForm, setPaymentForm] = useState<PaymentInfo>({
    method: paymentInfo?.method || 'pix',
    termsAccepted: paymentInfo?.termsAccepted || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  // Validation
  const validateStep = (step: CheckoutStep): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!personalForm.fullName.trim()) {
        newErrors.fullName = 'Nome completo é obrigatório';
      }
      if (!personalForm.email.trim()) {
        newErrors.email = 'E-mail é obrigatório';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalForm.email)) {
        newErrors.email = 'Formato de e-mail inválido';
      }
    }

    if (step === 2) {
      if (!deliveryForm.fivemId.trim()) {
        newErrors.fivemId = 'ID do jogador é obrigatório';
      }
    }

    if (step === 3) {
      if (!paymentForm.termsAccepted) {
        newErrors.terms = 'Você deve aceitar os Termos de Serviço';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      // Save current step data
      if (currentStep === 1) setUserInfo(personalForm);
      if (currentStep === 2) setDeliveryInfo(deliveryForm);
      if (currentStep === 3) setPaymentInfo(paymentForm);

      if (currentStep < 4) {
        setCurrentStep((currentStep + 1) as CheckoutStep);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as CheckoutStep);
    } else {
      setCurrentPage('shop');
    }
  };

  const handleComplete = () => {
    const order = createOrder();
    if (order) {
      setCreatedOrder(order);
      setShowSuccess(true);
    }
  };

  const connectDiscord = () => {
    // Simulate Discord OAuth
    setDeliveryForm({
      ...deliveryForm,
      discordConnected: true,
      discordUsername: 'Player#1234',
    });
  };

  // If cart is empty, redirect to shop
  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-muted-foreground mb-6">
            Adicione alguns itens para prosseguir com a compra
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="btn-primary"
          >
            Explorar Loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 1 ? 'Continuar Comprando' : 'Voltar'}</span>
        </button>

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : isCompleted
                          ? 'bg-primary/20 text-primary border border-primary'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 hidden sm:block ${
                        isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {!isLast && (
                    <div
                      className={`flex-1 h-px mx-2 sm:mx-4 ${
                        isCompleted ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Dados Pessoais
                </h2>
                <p className="text-muted-foreground">
                  Insira seus dados para o pedido
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome Completo <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={personalForm.fullName}
                    onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                    placeholder="João Silva"
                    className={`w-full ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-mail <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    value={personalForm.email}
                    onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                    placeholder="joao@exemplo.com"
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    CPF (Opcional)
                  </label>
                  <input
                    type="text"
                    value={personalForm.cpf}
                    onChange={(e) => setPersonalForm({ ...personalForm, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Delivery Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Informações de Entrega
                </h2>
                <p className="text-muted-foreground">
                  Como entregaremos seus itens no jogo
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ID do Jogador (FiveM) <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryForm.fivemId}
                    onChange={(e) => setDeliveryForm({ ...deliveryForm, fivemId: e.target.value })}
                    placeholder="Seu ID de jogador no jogo"
                    className={`w-full ${errors.fivemId ? 'border-red-500' : ''}`}
                  />
                  {errors.fivemId && (
                    <p className="text-red-500 text-sm mt-1">{errors.fivemId}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Você pode encontrar seu ID do FiveM no jogo pressionando F8 e digitando 'id'
                  </p>
                </div>

                <div className="border-t border-border pt-6">
                  <label className="block text-sm font-medium text-foreground mb-4">
                    Conta Discord
                  </label>
                  
                  {!deliveryForm.discordConnected ? (
                    <button
                      onClick={connectDiscord}
                      className="w-full py-3 px-4 bg-[#5865F2] text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#4752C4] transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Conectar Discord</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-3 p-4 bg-secondary rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{deliveryForm.discordUsername}</p>
                        <p className="text-sm text-primary">Conectado</p>
                      </div>
                      <Check className="w-5 h-5 text-primary ml-auto" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Método de Pagamento
                </h2>
                <p className="text-muted-foreground">
                  Escolha como deseja pagar
                </p>
              </div>

              <div className="space-y-4">
                {/* PIX Option */}
                <label
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentForm.method === 'pix'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    checked={paymentForm.method === 'pix'}
                    onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value as PaymentMethod })}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <span className="text-green-500 font-bold text-sm">PIX</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">PIX</p>
                        <p className="text-sm text-muted-foreground">Pagamento instantâneo (Brasil)</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentForm.method === 'pix' ? 'border-primary' : 'border-muted-foreground'
                    }`}
                  >
                    {paymentForm.method === 'pix' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                </label>

                {/* Credit Card Option */}
                <label
                  className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentForm.method === 'credit_card'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-secondary hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="credit_card"
                    checked={paymentForm.method === 'credit_card'}
                    onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value as PaymentMethod })}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Cartão de Crédito</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, etc.</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentForm.method === 'credit_card' ? 'border-primary' : 'border-muted-foreground'
                    }`}
                  >
                    {paymentForm.method === 'credit_card' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                </label>

                {/* Terms */}
                <div className="pt-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentForm.termsAccepted}
                      onChange={(e) => setPaymentForm({ ...paymentForm, termsAccepted: e.target.checked })}
                      className="checkbox-custom mt-0.5"
                    />
                    <span className="text-sm text-muted-foreground">
                      Concordo com os{' '}
                      <button className="text-primary hover:underline">Termos de Serviço</button>
                      {' '}e entendo que itens digitais não podem ser reembolsados.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-red-500 text-sm mt-2">{errors.terms}</p>
                  )}
                </div>

                {/* Security note */}
                <div className="flex items-center space-x-2 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Processamento de pagamento seguro. Suas informações são criptografadas.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Resumo do Pedido
                </h2>
                <p className="text-muted-foreground">
                  Revise seu pedido antes de finalizar
                </p>
              </div>

              {/* Order items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between p-4 bg-secondary rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image || '/images/product_pack_1.jpg'}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-foreground">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {item.product.category === 'vehicles' ? 'Veículos' : 
                           item.product.category === 'houses' ? 'Casas' : 
                           item.product.category === 'coins' ? 'Coins' : 'Pacotes'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-muted-foreground">Taxa</span>
                  <span className="text-foreground">R$ 0,00</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Customer info summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Cliente</p>
                  <p className="font-medium text-foreground">{userInfo?.fullName}</p>
                  <p className="text-sm text-muted-foreground">{userInfo?.email}</p>
                </div>
                <div className="p-4 bg-secondary rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Entrega</p>
                  <p className="font-medium text-foreground">ID do Jogador: {deliveryInfo?.fivemId}</p>
                  <p className="text-sm text-muted-foreground">
                    {deliveryInfo?.discordConnected ? `Discord: ${deliveryInfo.discordUsername}` : 'Discord: Não conectado'}
                  </p>
                </div>
              </div>

              {/* Payment method */}
              <div className="p-4 bg-secondary rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Método de Pagamento</p>
                <p className="font-medium text-foreground">
                  {paymentInfo?.method === 'pix' ? 'PIX' : 'Cartão de Crédito'}
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={handleBack}
              className="btn-secondary"
            >
              {currentStep === 1 ? 'Continuar Comprando' : 'Voltar'}
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="btn-primary"
              >
                Continuar
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="btn-primary"
              >
                Finalizar Compra
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground">
                Pedido Confirmado!
              </h2>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Seu pedido foi realizado com sucesso. Você receberá seus itens no jogo em breve.
            </p>
            <div className="p-4 bg-secondary rounded-xl mb-6">
              <p className="text-sm text-muted-foreground">ID do Pedido</p>
              <p className="font-mono text-foreground">{createdOrder?.id}</p>
            </div>
            <button
              onClick={() => {
                setShowSuccess(false);
                setCurrentPage('home');
                clearCart();
              }}
              className="btn-primary w-full"
            >
              Voltar ao Início
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
