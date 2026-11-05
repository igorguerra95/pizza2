import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { DeliveryInfoSection } from './components/DeliveryInfoSection';
import { ContactReservationSection } from './components/ContactReservationSection';
import { Footer } from './components/Footer';
import { PizzaModal } from './components/PizzaModal';
import { CartDrawer } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PizzaItem, CartItem, PizzaSize, CrustOption, ExtraTopping } from './types';
import { CRUST_OPTIONS } from './data/pizzas';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<PizzaItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Exibir toast temporário
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Adicionar item customizado através do modal
  const handleAddToCart = (customizedItem: {
    pizza: PizzaItem;
    size: PizzaSize;
    sizePrice: number;
    crust: CrustOption;
    extras: ExtraTopping[];
    notes: string;
    quantity: number;
    totalPrice: number;
  }) => {
    const newItem: CartItem = {
      cartId: `${customizedItem.pizza.id}-${customizedItem.size}-${customizedItem.crust.id}-${Date.now()}`,
      pizza: customizedItem.pizza,
      size: customizedItem.size,
      sizePrice: customizedItem.sizePrice,
      crust: customizedItem.crust,
      extras: customizedItem.extras,
      notes: customizedItem.notes,
      quantity: customizedItem.quantity,
      totalPrice: customizedItem.totalPrice,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`${customizedItem.pizza.name} foi adicionada à sua sacola!`);
  };

  // Adição rápida diretamente do cardápio
  const handleQuickAdd = (pizza: PizzaItem) => {
    const price = pizza.promoPrice || pizza.price;
    const newItem: CartItem = {
      cartId: `${pizza.id}-grande-${Date.now()}`,
      pizza,
      size: 'grande',
      sizePrice: price,
      crust: CRUST_OPTIONS[0],
      extras: [],
      notes: '',
      quantity: 1,
      totalPrice: price,
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`${pizza.name} adicionada à sacola!`);
  };

  // Atualizar quantidade
  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = item.totalPrice / item.quantity;
            return {
              ...item,
              quantity: newQty,
              totalPrice: singleUnitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remover item
  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Limpar carrinho
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Rolar para seção de contato
  const handleContactClick = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Rolar para seção do cardápio
  const handleExploreMenu = () => {
    const element = document.getElementById('cardapio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0908] text-[#F5EFEB] selection:bg-[#E31837] selection:text-white relative">
      {/* Toast Notificação de Item Adicionado */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-[#161310] border border-[#E31837] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-[#E31837] text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold block text-white">Item Adicionado!</span>
              <span className="text-[#D8CFBC]">{toastMessage}</span>
            </div>
            <button
              onClick={() => {
                setToastMessage(null);
                setIsCartOpen(true);
              }}
              className="ml-2 text-xs font-bold text-[#FF6B35] underline hover:text-[#FF8A5B] flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Ver Sacola</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de Navegação */}
      <Navbar
        cartCount={totalItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onContactClick={handleContactClick}
      />

      {/* Conteúdo Principal */}
      <main>
        {/* Seção 1: Início (Hero) */}
        <Hero
          onExploreMenu={handleExploreMenu}
          onContactClick={handleContactClick}
        />

        {/* Seção 2: Cardápio Digital */}
        <MenuSection
          onSelectPizza={(pizza) => setSelectedPizza(pizza)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Seção 3: A Forneria (Sobre Nós) */}
        <AboutSection />

        {/* Seção 4: Atendimento & Entrega (Padrão de Qualidade) */}
        <DeliveryInfoSection
          onOrderClick={handleExploreMenu}
          onContactClick={handleContactClick}
        />

        {/* Seção 5: Contato & Reservas */}
        <ContactReservationSection />
      </main>

      {/* Rodapé */}
      <Footer />

      {/* Modal de Personalização da Pizza */}
      <PizzaModal
        pizza={selectedPizza}
        isOpen={Boolean(selectedPizza)}
        onClose={() => setSelectedPizza(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Drawer da Sacola de Pedidos */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Botão Flutuante do WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
