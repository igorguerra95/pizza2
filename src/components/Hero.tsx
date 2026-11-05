import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Clock,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Award,
  Phone,
  Utensils,
} from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onContactClick }) => {
  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-ember-radial"
    >
      {/* Background Decorativo com Luz Quente de Forno */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#E31837]/20 via-[#FF6B35]/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna de Texto (7 colunas) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag Editorial Sem Caixas Clichês */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#FF6B35]"
            >
              <Flame className="w-4 h-4 text-[#E31837] animate-pulse" />
              <span>Forneria & Pizzaria Teste</span>
              <span className="text-[#A89F93]">·</span>
              <span className="text-[#D8CFBC]">Tradição Napolitana</span>
            </motion.div>

            {/* Headline Magnético com Clamp Gigante (48–96px) */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
              className="font-serif font-black text-4xl sm:text-6xl lg:text-[76px] xl:text-[84px] leading-[1.05] tracking-tight text-white"
            >
              A alquimia da <br className="hidden sm:inline" />
              <span className="text-gold-gradient italic font-normal">massa viva</span>, o calor nobre da lenha.
            </motion.h1>

            {/* Subheadline persuasivo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: 'easeOut' }}
              className="text-base sm:text-lg text-[#D8CFBC] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Fermentação lenta e natural de 48 horas, farinha italiana tipo 00, molho de tomates San Marzano colhidos aos pés do Vesúvio e queijos nobres assados a 450°C no calor da brasa viva.
            </motion.p>

            {/* CTAs de Alta Conversão */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                type="button"
                onClick={onExploreMenu}
                className="w-full sm:w-auto bg-gradient-to-r from-[#E31837] to-[#FF6B35] hover:from-[#C5112C] hover:to-[#E8551F] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-[#E31837]/30 hover:shadow-2xl hover:shadow-[#E31837]/40 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <Utensils className="w-5 h-5" />
                <span>Ver Cardápio & Pedir</span>
              </button>

              <button
                type="button"
                onClick={onContactClick}
                className="w-full sm:w-auto bg-[#1A1613] hover:bg-[#25201C] text-[#F5EFEB] border border-[#2C2420] hover:border-[#FF6B35]/50 font-semibold text-base px-8 py-4 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 text-[#FF6B35]" />
                <span>Entrar em contato</span>
              </button>
            </motion.div>

            {/* Micro-Garantias & Diferenciais */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.32 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2C2420]/80 text-left max-w-lg mx-auto lg:mx-0"
            >
              <div>
                <span className="block font-serif font-bold text-xl sm:text-2xl text-white">48h</span>
                <span className="text-xs text-[#A89F93]">Maturação natural</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-xl sm:text-2xl text-[#FF6B35]">450°C</span>
                <span className="text-xs text-[#A89F93]">Lenha de macieira</span>
              </div>
              <div>
                <span className="block font-serif font-bold text-xl sm:text-2xl text-white">35-45m</span>
                <span className="text-xs text-[#A89F93]">Entrega quentinha</span>
              </div>
            </motion.div>
          </div>

          {/* Coluna da Imagem Heroica (5 colunas) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Halo de Brasa */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#E31837]/30 via-[#FF6B35]/20 to-transparent rounded-full blur-2xl opacity-70 -z-10" />

            {/* Moldura da Pizza Artesanal */}
            <div className="relative rounded-3xl overflow-hidden border border-[#2C2420] shadow-2xl bg-[#14110F]">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85"
                alt="Pizza artesanal saindo do forno a lenha com bordas aeradas"
                className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Card Flutuante com Destaque de Qualidade */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#14110F]/90 backdrop-blur-md border border-[#2C2420] shadow-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E31837] to-[#FF6B35] flex items-center justify-center text-white shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Massa de Levain</h4>
                    <p className="text-xs text-[#A89F93]">Leve, digestiva e aerada</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-[#FF6B35] font-semibold block">
                    Preço Médio
                  </span>
                  <span className="text-sm font-bold text-white">a partir de R$ 48</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Seta discreta para rolar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-[#A89F93] hover:text-white transition-colors">
        <a href="#cardapio" className="flex flex-col items-center gap-1 text-xs" aria-label="Rolar para o cardápio">
          <span className="text-[11px] uppercase tracking-widest text-[#6E6359]">Conheça as pizzas</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#FF6B35]" />
        </a>
      </div>
    </section>
  );
};
