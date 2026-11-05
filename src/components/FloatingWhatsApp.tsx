import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Flame, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    'Olá! Gostaria de consultar o cardápio e fazer um pedido na Pizzaria Teste.'
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-3 max-w-[240px] bg-[#1A1613] text-[#F5EFEB] border border-[#2C2420] p-3 rounded-2xl shadow-xl shadow-black/50 relative text-xs"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#2C2420] text-[#A89F93] hover:text-white flex items-center justify-center transition-colors"
              aria-label="Fechar dica"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-1.5 text-[#FF6B35] font-semibold text-[11px] mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Forno a Lenha Aceso!</span>
            </div>
            <p className="text-[#D8CFBC] text-[11px] leading-tight">
              Faça seu pedido diretamente ou tire dúvidas com nossa equipe.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Entrar em contato via WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] transition-all hover:scale-105 active:scale-95"
      >
        {/* Anel pulsante sutil */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-75 pointer-events-none" />

        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
};
