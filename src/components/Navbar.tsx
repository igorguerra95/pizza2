import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Phone,
  Clock,
  ChevronRight,
  UtensilsCrossed,
} from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onContactClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Cardápio Digital', href: '#cardapio' },
    { label: 'A Forneria', href: '#sobre' },
    { label: 'Entrega & Retirada', href: '#entrega' },
    { label: 'Contato & Reservas', href: '#contato' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0908]/90 backdrop-blur-md border-b border-[#2C2420] shadow-xl py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo e Identidade */}
            <a
              href="#inicio"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] p-0.5 shadow-md shadow-[#E31837]/30 transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-[#14110F] rounded-[10px] flex items-center justify-center text-[#FF6B35]">
                  <Flame className="w-5 h-5 text-[#E31837] group-hover:text-[#FF6B35] transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-xl sm:text-2xl text-white tracking-wider leading-none">
                  TESTE
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#FF6B35] leading-tight">
                  Forneria Artesanal
                </span>
              </div>
            </a>

            {/* Links Desktop */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#D8CFBC]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E31837] hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Ações da Direita */}
            <div className="flex items-center gap-3">
              {/* Status Forno */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1613] border border-[#2C2420] text-xs text-[#A89F93]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-white font-medium">Aberto hoje</span>
                <span>·</span>
                <span>18h às 23h45</span>
              </div>

              {/* Botão da Sacola */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-xl bg-[#1A1613] hover:bg-[#25201C] border border-[#2C2420] text-[#D8CFBC] hover:text-white transition-all flex items-center gap-2 group"
                aria-label="Abrir sacola de pedidos"
              >
                <ShoppingBag className="w-5 h-5 text-[#FF6B35] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#E31837] text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
                    {cartCount}
                  </span>
                )}
                <span className="hidden md:inline text-xs font-semibold">
                  Sacola
                </span>
              </button>

              {/* CTA Principal: "Entrar em contato" */}
              <button
                type="button"
                onClick={onContactClick}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#E31837] to-[#FF6B35] hover:from-[#C5112C] hover:to-[#E8551F] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#E31837]/25 hover:shadow-lg hover:shadow-[#E31837]/35 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Entrar em contato</span>
              </button>

              {/* Toggle Menu Mobile */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-[#1A1613] border border-[#2C2420] text-[#D8CFBC] hover:text-white"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] z-30 bg-[#120F0D] border-b border-[#2C2420] shadow-2xl lg:hidden p-6 space-y-5 text-[#F5EFEB]"
          >
            <div className="flex items-center gap-2 text-xs text-[#A89F93] pb-3 border-b border-[#2C2420]">
              <Clock className="w-4 h-4 text-[#FF6B35]" />
              <span>Forno a lenha funcionando das 18h às 23h45</span>
            </div>

            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium py-2 text-[#D8CFBC] hover:text-white"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#A89F93]" />
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#2C2420] space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full bg-gradient-to-r from-[#E31837] to-[#FF6B35] text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Entrar em contato</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full bg-[#1E1916] border border-[#2C2420] text-white text-sm font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#FF6B35]" />
                <span>Ver Sacola ({cartCount} itens)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
