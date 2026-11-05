import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Check, Flame, Sparkles } from 'lucide-react';
import { PizzaItem, PizzaSize, CrustOption, ExtraTopping } from '../types';
import { CRUST_OPTIONS, EXTRA_TOPPINGS } from '../data/pizzas';

interface PizzaModalProps {
  pizza: PizzaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customizedItem: {
    pizza: PizzaItem;
    size: PizzaSize;
    sizePrice: number;
    crust: CrustOption;
    extras: ExtraTopping[];
    notes: string;
    quantity: number;
    totalPrice: number;
  }) => void;
}

export const PizzaModal: React.FC<PizzaModalProps> = ({
  pizza,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!pizza) return null;

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('grande');
  const [selectedCrust, setSelectedCrust] = useState<CrustOption>(CRUST_OPTIONS[0]);
  const [selectedExtras, setSelectedExtras] = useState<ExtraTopping[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Tamanhos com multiplicador de preço
  const sizeMultipliers: Record<PizzaSize, { label: string; slices: string; mult: number }> = {
    broto: { label: 'Broto Individual', slices: '4 fatias (25cm)', mult: 0.7 },
    media: { label: 'Tamanho Médio', slices: '6 fatias (30cm)', mult: 0.88 },
    grande: { label: 'Tamanho Família Grande', slices: '8 fatias (35cm)', mult: 1.0 },
  };

  const basePrice = pizza.promoPrice || pizza.price;
  const sizePrice = Math.round(basePrice * sizeMultipliers[selectedSize].mult);
  const crustPrice = selectedCrust.price;
  const extrasPrice = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
  const unitPrice = sizePrice + crustPrice + extrasPrice;
  const totalPrice = unitPrice * quantity;

  const toggleExtra = (extra: ExtraTopping) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleConfirm = () => {
    onAddToCart({
      pizza,
      size: selectedSize,
      sizePrice,
      crust: selectedCrust,
      extras: selectedExtras,
      notes,
      quantity,
      totalPrice,
    });
    // Reset state and close
    setSelectedSize('grande');
    setSelectedCrust(CRUST_OPTIONS[0]);
    setSelectedExtras([]);
    setNotes('');
    setQuantity(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop escuro com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#14110F] border border-[#2C2420] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-[#F5EFEB]"
          >
            {/* Header da Imagem */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0">
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-black/40 to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-[#E31837] transition-colors flex items-center justify-center backdrop-blur-sm border border-white/10"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 text-xs text-[#FF6B35] font-semibold tracking-wider uppercase mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Forno a Lenha Napolitano</span>
                  {pizza.isVegetarian && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-400">Opção Vegetariana</span>
                    </>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                  {pizza.name}
                </h3>
              </div>
            </div>

            {/* Conteúdo rolável */}
            <div className="p-6 overflow-y-auto space-y-6 divide-y divide-[#2C2420]">
              {/* Descrição e Ingredientes */}
              <div>
                <p className="text-sm text-[#A89F93] leading-relaxed mb-3">
                  {pizza.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {pizza.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#1E1916] text-[#D8CFBC] border border-[#2C2420] px-2.5 py-1 rounded-md"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Escolha do Tamanho (se não for bebida) */}
              {pizza.category !== 'bebidas' && (
                <div className="pt-6">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[#FFB471] mb-3">
                    1. Escolha o Tamanho da Pizza
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(Object.keys(sizeMultipliers) as PizzaSize[]).map((sizeKey) => {
                      const sizeInfo = sizeMultipliers[sizeKey];
                      const priceForSize = Math.round(basePrice * sizeInfo.mult);
                      const isSelected = selectedSize === sizeKey;

                      return (
                        <button
                          key={sizeKey}
                          type="button"
                          onClick={() => setSelectedSize(sizeKey)}
                          className={`p-3.5 rounded-xl border text-left transition-all relative ${
                            isSelected
                              ? 'bg-[#E31837]/15 border-[#E31837] shadow-[0_0_15px_rgba(227,24,55,0.25)]'
                              : 'bg-[#1A1613] border-[#2C2420] hover:border-[#4A3E37]'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-semibold text-white text-sm">
                              {sizeInfo.label}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#E31837] text-white flex items-center justify-center text-xs">
                                <Check className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#A89F93] mb-2">{sizeInfo.slices}</p>
                          <span className="text-sm font-bold text-[#FF6B35]">
                            R$ {priceForSize.toFixed(2).replace('.', ',')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Escolha da Borda (apenas para pizzas) */}
              {pizza.category !== 'bebidas' && (
                <div className="pt-6">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[#FFB471] mb-3">
                    2. Escolha a Borda Artesanal
                  </label>
                  <div className="space-y-2">
                    {CRUST_OPTIONS.map((crust) => {
                      const isSelected = selectedCrust.id === crust.id;
                      return (
                        <button
                          key={crust.id}
                          type="button"
                          onClick={() => setSelectedCrust(crust)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${
                            isSelected
                              ? 'bg-[#E31837]/15 border-[#E31837] text-white'
                              : 'bg-[#1A1613] border-[#2C2420] text-[#D8CFBC] hover:border-[#4A3E37]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#E31837] bg-[#E31837]' : 'border-[#4A3E37]'
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <span>{crust.name}</span>
                          </div>
                          <span className="font-semibold text-[#FF6B35]">
                            {crust.price === 0
                              ? 'Inclusa'
                              : `+ R$ ${crust.price.toFixed(2).replace('.', ',')}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Adicionais Opcionais */}
              {pizza.category !== 'bebidas' && (
                <div className="pt-6">
                  <label className="block text-sm font-semibold uppercase tracking-wider text-[#FFB471] mb-3">
                    3. Ingredientes Adicionais (Opcional)
                  </label>
                  <div className="space-y-2">
                    {EXTRA_TOPPINGS.map((extra) => {
                      const isChecked = selectedExtras.some((e) => e.id === extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${
                            isChecked
                              ? 'bg-[#FF6B35]/15 border-[#FF6B35] text-white'
                              : 'bg-[#1A1613] border-[#2C2420] text-[#D8CFBC] hover:border-[#4A3E37]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isChecked ? 'border-[#FF6B35] bg-[#FF6B35] text-white' : 'border-[#4A3E37]'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3" />}
                            </span>
                            <span>{extra.name}</span>
                          </div>
                          <span className="font-semibold text-[#FF6B35]">
                            + R$ {extra.price.toFixed(2).replace('.', ',')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Observações */}
              <div className="pt-6">
                <label className="block text-sm font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                  Observações para a Cozinha
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: massa bem dourada, sem cebola, cortar em 8 fatias bem divididas..."
                  rows={2}
                  className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl p-3 text-sm text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837] transition-colors"
                />
              </div>
            </div>

            {/* Footer com quantidade e botão de adicionar */}
            <div className="p-4 sm:p-6 bg-[#161310] border-t border-[#2C2420] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              {/* Seletor de Quantidade */}
              <div className="flex items-center gap-3 bg-[#1E1916] border border-[#2C2420] px-3 py-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A89F93] hover:text-white hover:bg-[#2C2420] transition-colors disabled:opacity-40"
                  disabled={quantity <= 1}
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-white text-base min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A89F93] hover:text-white hover:bg-[#2C2420] transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Botão de Confirmação */}
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#E31837] to-[#FF6B35] hover:from-[#C5112C] hover:to-[#E8551F] text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-[#E31837]/30 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Adicionar ao Pedido</span>
                <span className="bg-black/25 px-2.5 py-0.5 rounded-lg text-sm font-bold ml-1">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
