import React from 'react';
import { motion } from 'motion/react';
import {
  Bike,
  ShieldCheck,
  PackageCheck,
  Store,
  Clock,
  Sparkles,
  Phone,
  Flame,
} from 'lucide-react';

interface DeliveryInfoSectionProps {
  onOrderClick: () => void;
  onContactClick: () => void;
}

export const DeliveryInfoSection: React.FC<DeliveryInfoSectionProps> = ({
  onOrderClick,
  onContactClick,
}) => {
  const steps = [
    {
      step: '01',
      title: 'Embalagem Térmica Respirável',
      description:
        'Nossa caixa foi desenhada com aberturas de microventilação estratégicas: o calor é mantido, mas o vapor excessivo é liberado para a borda continuar 100% crocante.',
    },
    {
      step: '02',
      title: 'Lacre de Segurança Inviolável',
      description:
        'Sua pizza sai do forno e é imediatamente selada com lacre numerado de alta aderência, garantindo máxima higiene e integridade do primeiro ao último pedaço.',
    },
    {
      step: '03',
      title: 'Transporte Nivelado & Rápido',
      description:
        'Frota própria e parceiros treinados com mochilas térmicas rígidas e estabilizador horizontal, para que os queijos nobres cheguem perfeitamente distribuídos.',
    },
    {
      step: '04',
      title: 'Retirada Expressa no Balcão',
      description:
        'Prefere buscar a caminho de casa? Agende pelo nosso WhatsApp ou sacola online e retire sua pizza quentinha no balcão sem filas e com desconto especial.',
    },
  ];

  return (
    <section id="entrega" className="py-24 bg-[#0E0C0A] relative text-[#F5EFEB] overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E31837]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF6B35] mb-2">
            <Bike className="w-4 h-4 text-[#E31837]" />
            <span>Padrão de Entrega & Retirada</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight mb-4">
            Como garantimos que sua pizza chegue perfeita à sua mesa
          </h2>
          <p className="text-sm sm:text-base text-[#D8CFBC] font-light leading-relaxed">
            Nada de queijo amassado ou crosta amolecida. Desenvolvemos um protocolo rigoroso de entrega para que a experiência em casa seja idêntica à do nosso salão.
          </p>
        </div>

        {/* 4 Passos do Protocolo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#14110F] border border-[#2C2420] hover:border-[#4A3E37] transition-all relative flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-serif font-black text-[#FF6B35]/40 block mb-3">
                  {st.step}
                </span>
                <h3 className="text-lg font-serif font-bold text-white mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A89F93] leading-relaxed font-light">
                  {st.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2C2420]/60 flex items-center gap-1.5 text-xs text-[#FFB471]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garantia de Qualidade</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner de Ação para Pedido */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1E1916] via-[#161310] to-[#1E1916] border border-[#2C2420] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF6B35]">
              <Sparkles className="w-4 h-4 text-[#E31837]" />
              <span>Forno a Lenha Ativo Hoje</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Deu vontade de uma autêntica pizza artesanal?
            </h3>
            <p className="text-xs sm:text-sm text-[#A89F93] max-w-xl">
              Faça seu pedido diretamente pelo nosso cardápio digital ou fale com nossa equipe no WhatsApp para opções personalizadas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOrderClick}
              className="bg-gradient-to-r from-[#E31837] to-[#FF6B35] hover:from-[#C5112C] hover:to-[#E8551F] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#E31837]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Flame className="w-4 h-4" />
              <span>Pedir Agora Mesmo</span>
            </button>

            <button
              type="button"
              onClick={onContactClick}
              className="bg-[#14110F] hover:bg-[#25201C] text-[#F5EFEB] border border-[#2C2420] font-semibold text-sm px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#FF6B35]" />
              <span>Entrar em contato</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
