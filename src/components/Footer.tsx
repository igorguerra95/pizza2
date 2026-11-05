import React from 'react';
import { Flame, Heart, ArrowUp, Phone, Clock, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080706] border-t border-[#2C2420] text-[#A89F93] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2C2420]/80">
          {/* Coluna Marca (5 colunas) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#14110F] rounded-[10px] flex items-center justify-center text-[#FF6B35]">
                  <Flame className="w-5 h-5 text-[#E31837]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-xl text-white tracking-wider leading-none">
                  TESTE
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-[0.25em] text-[#FF6B35] leading-tight">
                  Forneria Artesanal
                </span>
              </div>
            </div>

            <p className="text-[#D8CFBC] text-sm leading-relaxed max-w-sm font-light">
              Pizzas de fermentação natural de 48 horas, tomates San Marzano D.O.P. e queijos nobres assados em forno a lenha a 450°C. A autêntica experiência italiana na sua mesa.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://api.whatsapp.com/send?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Pizzaria%20Teste."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#14110F] border border-[#2C2420] text-[#D8CFBC] hover:text-white hover:border-[#FF6B35] transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Oficial</span>
              </a>
            </div>
          </div>

          {/* Coluna Links (3 colunas) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Navegação Rápida
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-white transition-colors">
                  Cardápio Digital & Pedidos
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  História & Forno a Lenha
                </a>
              </li>
              <li>
                <a href="#entrega" className="hover:text-white transition-colors">
                  Padrão de Entrega & Embalagem
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  Reservas & Fale Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna Horários & Atendimento (4 colunas) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">
              Horários da Forneria
            </h4>
            <div className="space-y-2 text-[#D8CFBC]">
              <div className="flex justify-between pb-1 border-b border-[#2C2420]/50">
                <span>Terça a Quinta-feira:</span>
                <span className="font-medium text-white">18h00 às 23h30</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#2C2420]/50">
                <span>Sexta e Sábado:</span>
                <span className="font-medium text-white">18h00 às 00h00</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#2C2420]/50">
                <span>Domingo:</span>
                <span className="font-medium text-white">18h00 às 23h30</span>
              </div>
              <div className="flex justify-between pb-1">
                <span>Segunda-feira:</span>
                <span className="text-[#FF6B35]">Fechado para descanso</span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha Inferior com Copyright e Botão Voltar ao Topo */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#786F64] text-center sm:text-left">
            © {new Date().getFullYear()} Pizzaria Teste • Todos os direitos reservados. Feito com amor pela boa gastronomia artesanal.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-[#A89F93] hover:text-white transition-colors p-2 rounded-lg hover:bg-[#14110F]"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF6B35]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
