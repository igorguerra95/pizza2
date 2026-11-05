import React from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Award,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Wheat,
  Clock,
  Star,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    {
      value: '14+',
      label: 'Anos de Tradição',
      sublabel: 'Desde o primeiro forno aceso com lenha de macieira',
    },
    {
      value: '5.200+',
      label: 'Pizzas por Mês',
      sublabel: 'Assadas com paixão, crocância e queijos nobres',
    },
    {
      value: '48h',
      label: 'Maturação a Frio',
      sublabel: 'Massa levíssima com altíssima digestibilidade',
    },
    {
      value: '4.9 ★',
      label: 'Avaliações 5 Estrelas',
      sublabel: 'Reconhecimento caloroso de quem ama pizza de verdade',
    },
  ];

  const pillars = [
    {
      icon: Wheat,
      title: 'Farinha Italiana Tipo 00',
      description:
        'Utilizamos trigo especial com moagem ultrafina importado da Itália, garantindo textura sedosa, alvéolos perfeitos e cornicione crocante.',
    },
    {
      icon: Clock,
      title: 'Fermentação Lenta 48 Horas',
      description:
        'Nossa massa descansa pacientemente sob temperatura controlada por 48 horas. O resultado é leve, aerado e não pesa no estômago.',
    },
    {
      icon: Flame,
      title: 'Forno a Lenha a 450°C',
      description:
        'Cúpula de pedra refratária alimentada por lenha certificada de reflorestamento. As pizzas assam em apenas 90 segundos com sabor defumado ímpar.',
    },
    {
      icon: Award,
      title: 'Tomates San Marzano D.O.P.',
      description:
        'Molho artesanal fresco produzido exclusivamente com os aclamados tomates doces e aveludados colhidos na região vulcânica de Nápoles.',
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-[#0B0908] relative text-[#F5EFEB] overflow-hidden">
      {/* Brilho de brasa ambiente */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FF6B35]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF6B35]">
              <Flame className="w-4 h-4 text-[#E31837]" />
              <span>Nossa História & Devoção à Lenha</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight leading-tight">
              O amor pela verdadeira pizza napolitana, feito sem atalhos.
            </h2>

            <p className="text-base text-[#D8CFBC] leading-relaxed font-light">
              A história da <strong className="text-white font-semibold">Pizzaria Teste</strong> começou com uma obsessão simples: criar a massa perfeita. Acreditamos que uma pizza memorável não depende de excessos, mas sim da pureza dos ingredientes, do respeito absoluto ao tempo da natureza e do calor vivo da madeira.
            </p>

            <p className="text-sm text-[#A89F93] leading-relaxed">
              Todos os dias, às primeiras horas da manhã, nossos mestres forneiros alimentam o fermento natural (levain) cultivado com carinho há mais de uma década. Quando você dá a primeira mordida e sente a borda inflada, crocante por fora e macia como nuvem por dentro, entende o porquê de cada segundo dedicado.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#FFB471]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sem conservantes artificiais</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Queijos de pequenos produtores</span>
              </div>
            </div>
          </div>

          {/* Composição Fotográfica Assimétrica */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden border border-[#2C2420] shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80"
                  alt="Massa de pizza artesanal fermentando com alvéolos"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl overflow-hidden border border-[#2C2420] shadow-xl mt-6"
              >
                <img
                  src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=80"
                  alt="Forno a lenha napolitano em brasa ardente"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            </div>

            {/* Selo Central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#161310]/95 border border-[#FF6B35]/40 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-center max-w-[200px]">
              <Sparkles className="w-6 h-6 text-[#FF6B35] mx-auto mb-1" />
              <span className="block font-serif font-black text-white text-base">
                100% Artesanal
              </span>
              <span className="text-[11px] text-[#A89F93]">
                Do grão ao forno a lenha
              </span>
            </div>
          </div>
        </div>

        {/* Estatísticas em Destaque */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-[#14110F] border border-[#2C2420] shadow-2xl mb-20">
          {stats.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left border-r last:border-r-0 border-[#2C2420]/60 pr-4"
            >
              <div className="font-serif font-black text-3xl sm:text-5xl text-gold-gradient tracking-tight mb-1">
                {st.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-white mb-0.5">
                {st.label}
              </div>
              <div className="text-xs text-[#A89F93] font-light leading-snug">
                {st.sublabel}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4 Pilares da Nossa Qualidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#14110F] border border-[#2C2420] hover:border-[#4A3E37] transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E31837]/15 border border-[#E31837]/30 flex items-center justify-center text-[#FF6B35]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A89F93] font-light leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
