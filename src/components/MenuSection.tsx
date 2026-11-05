import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Flame,
  Star,
  Leaf,
  Sparkles,
  Plus,
  Utensils,
  Wine,
  Filter,
  Check,
} from 'lucide-react';
import { PizzaItem, PizzaCategory } from '../types';
import { PIZZAS } from '../data/pizzas';

interface MenuSectionProps {
  onSelectPizza: (pizza: PizzaItem) => void;
  onQuickAdd: (pizza: PizzaItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectPizza,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<PizzaCategory>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [onlyPopular, setOnlyPopular] = useState(false);

  const categories = [
    { id: 'todas', label: 'Todas as Criações', count: PIZZAS.length },
    {
      id: 'tradicionais',
      label: 'Tradicionais',
      count: PIZZAS.filter((p) => p.category === 'tradicionais').length,
    },
    {
      id: 'especiais',
      label: 'Especiais da Casa',
      count: PIZZAS.filter((p) => p.category === 'especiais').length,
    },
    {
      id: 'doces',
      label: 'Pizzas Doces',
      count: PIZZAS.filter((p) => p.category === 'doces').length,
    },
    {
      id: 'bebidas',
      label: 'Vinhos & Bebidas',
      count: PIZZAS.filter((p) => p.category === 'bebidas').length,
    },
  ];

  const filteredPizzas = useMemo(() => {
    return PIZZAS.filter((pizza) => {
      // Filtro de categoria
      if (activeCategory !== 'todas' && pizza.category !== activeCategory) {
        return false;
      }
      // Filtro de busca (nome, descrição, ingredientes)
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = pizza.name.toLowerCase().includes(query);
        const matchesDesc = pizza.description.toLowerCase().includes(query);
        const matchesIng = pizza.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      // Filtro vegetariano
      if (onlyVegetarian && !pizza.isVegetarian) return false;
      // Filtro populares
      if (onlyPopular && !pizza.isPopular) return false;

      return true;
    });
  }, [activeCategory, searchTerm, onlyVegetarian, onlyPopular]);

  return (
    <section id="cardapio" className="py-24 bg-[#0E0C0A] relative text-[#F5EFEB]">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#E31837]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF6B35] mb-2">
            <Flame className="w-4 h-4 text-[#E31837]" />
            <span>Cardápio Digital Oficial</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight mb-4">
            Nossas Pizzas & Seleções
          </h2>
          <p className="text-sm sm:text-base text-[#D8CFBC] font-light leading-relaxed">
            Cada redonda é aberta manualmente por nossos pizzaiolos, coberta com ingredientes frescos de pequenos produtores e assada em temperatura vulcânica.
          </p>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="space-y-6 mb-12">
          {/* Abas de Categorias */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id as PizzaCategory)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#E31837] to-[#FF6B35] text-white shadow-md shadow-[#E31837]/25'
                      : 'bg-[#181412] text-[#A89F93] hover:text-white border border-[#2C2420] hover:border-[#4A3E37]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-black/30 text-white' : 'bg-[#221C18] text-[#786F64]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Busca e Filtros Rápidos */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#14110F] border border-[#2C2420] p-3 sm:p-4 rounded-2xl">
            {/* Input de Busca */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89F93]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por sabor ou ingrediente (ex: rúcula, burrata, pepperoni)..."
                className="w-full bg-[#1C1714] border border-[#2C2420] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837] transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A89F93] hover:text-white"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Checkboxes de Filtro Rápido */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              <button
                type="button"
                onClick={() => setOnlyVegetarian(!onlyVegetarian)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  onlyVegetarian
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
                    : 'bg-[#1C1714] border-[#2C2420] text-[#A89F93] hover:text-white'
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vegetarianas</span>
                {onlyVegetarian && <Check className="w-3 h-3 text-emerald-400 ml-1" />}
              </button>

              <button
                type="button"
                onClick={() => setOnlyPopular(!onlyPopular)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  onlyPopular
                    ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                    : 'bg-[#1C1714] border-[#2C2420] text-[#A89F93] hover:text-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>Mais Pedidas</span>
                {onlyPopular && <Check className="w-3 h-3 text-amber-400 ml-1" />}
              </button>
            </div>
          </div>
        </div>

        {/* Grid de Cards de Pizza */}
        {filteredPizzas.length === 0 ? (
          <div className="py-16 text-center text-[#A89F93] bg-[#14110F] border border-[#2C2420] rounded-2xl p-8">
            <Utensils className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#FF6B35]" />
            <h3 className="text-lg font-bold text-white mb-1">Nenhuma criação encontrada</h3>
            <p className="text-xs text-[#A89F93] max-w-sm mx-auto mb-4">
              Não encontramos nenhuma opção correspondente aos filtros aplicados. Tente buscar por outros termos.
            </p>
            <button
              onClick={() => {
                setActiveCategory('todas');
                setSearchTerm('');
                setOnlyVegetarian(false);
                setOnlyPopular(false);
              }}
              className="text-xs text-[#FF6B35] underline hover:text-[#FF8A5B]"
            >
              Restaurar todos os filtros
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredPizzas.map((pizza) => {
              const displayPrice = pizza.promoPrice || pizza.price;

              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  key={pizza.id}
                  className="group bg-[#14110F] border border-[#2C2420] rounded-2xl overflow-hidden hover:border-[#4A3E37] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                >
                  {/* Foto da Pizza */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-black/40">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-black/30" />

                    {/* Tags Discretas */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {pizza.isChefSpecial && (
                        <span className="bg-[#E31837] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Receita do Chef</span>
                        </span>
                      )}
                      {pizza.isPopular && !pizza.isChefSpecial && (
                        <span className="bg-[#FF6B35] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>Favorita</span>
                        </span>
                      )}
                      {pizza.isVegetarian && (
                        <span className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
                          Vegetariana
                        </span>
                      )}
                    </div>

                    {pizza.promoPrice && (
                      <div className="absolute top-3 right-3 bg-white text-[#E31837] font-black text-xs px-2 py-0.5 rounded-md shadow-md">
                        PROMOÇÃO
                      </div>
                    )}
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-1.5">
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#FFB471] transition-colors leading-snug">
                          {pizza.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#A89F93] leading-relaxed line-clamp-3 mb-4 font-light">
                        {pizza.description}
                      </p>

                      {/* Lista de ingredientes */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {pizza.ingredients.slice(0, 3).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[11px] text-[#A89F93] bg-[#1C1714] border border-[#2C2420] px-2 py-0.5 rounded"
                          >
                            {ing}
                          </span>
                        ))}
                        {pizza.ingredients.length > 3 && (
                          <span className="text-[11px] text-[#736B60] self-center">
                            +{pizza.ingredients.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Preço e Botões de Ação */}
                    <div className="pt-4 border-t border-[#2C2420]/70 flex items-center justify-between gap-3">
                      <div>
                        {pizza.promoPrice && (
                          <span className="text-xs text-[#736B60] line-through block">
                            R$ {pizza.price.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                        <span className="text-xl sm:text-2xl font-bold font-serif text-[#FF6B35]">
                          R$ {displayPrice.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectPizza(pizza)}
                          className="bg-gradient-to-r from-[#E31837] to-[#FF6B35] hover:from-[#C5112C] hover:to-[#E8551F] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#E31837]/20 flex items-center gap-1.5 active:scale-95"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Personalizar & Pedir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};
