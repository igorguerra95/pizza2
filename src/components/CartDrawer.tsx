import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  Bike,
  Store,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryType, setDeliveryType] = useState<'entrega' | 'retirada'>('entrega');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [changeFor, setChangeFor] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = deliveryType === 'entrega' ? (subtotal >= 120 ? 0 : 8) : 0;
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - pixDiscount);

  const handleSendOrderToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    // Gerar texto formatado para o WhatsApp
    const orderLines = items.map((item, idx) => {
      const sizeLabel =
        item.size === 'broto' ? 'Broto (4 fat.)' : item.size === 'media' ? 'Média (6 fat.)' : 'Grande (8 fat.)';
      const crustLabel = item.crust.price > 0 ? ` + Borda: ${item.crust.name}` : '';
      const extrasLabel =
        item.extras.length > 0
          ? ` + Extras: ${item.extras.map((e) => e.name).join(', ')}`
          : '';
      const noteLabel = item.notes ? ` (Obs: ${item.notes})` : '';

      return `${idx + 1}. *${item.quantity}x ${item.pizza.name}* [${sizeLabel}]${crustLabel}${extrasLabel}${noteLabel} — R$ ${item.totalPrice.toFixed(2)}`;
    });

    const deliveryText =
      deliveryType === 'entrega'
        ? `🛵 *Tipo:* Entrega em Domicílio\n📍 *Endereço:* ${address || 'A combinar'}`
        : `🏪 *Tipo:* Retirada no Balcão da Forneria`;

    const paymentText =
      paymentMethod === 'pix'
        ? 'Pix (com 5% de desconto especial)'
        : paymentMethod === 'cartao'
        ? 'Cartão na entrega (Maquininha)'
        : `Dinheiro ${changeFor ? `(Troco para R$ ${changeFor})` : ''}`;

    const message = `🍕 *NOVO PEDIDO — PIZZARIA TESTE*\n` +
      `-----------------------------------------\n` +
      `👤 *Cliente:* ${customerName || 'Cliente Amigo'}\n` +
      `📱 *Telefone:* ${customerPhone || 'Informado no chat'}\n` +
      `${deliveryText}\n` +
      `💳 *Forma de Pagamento:* ${paymentText}\n\n` +
      `📋 *ITENS DO PEDIDO:*\n` +
      `${orderLines.join('\n')}\n\n` +
      `-----------------------------------------\n` +
      `Subtotal: R$ ${subtotal.toFixed(2)}\n` +
      (deliveryType === 'entrega' ? `Taxa de Entrega: ${deliveryFee === 0 ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2)}`}\n` : '') +
      (paymentMethod === 'pix' ? `Desconto Pix (5%): - R$ ${pixDiscount.toFixed(2)}\n` : '') +
      `*VALOR TOTAL: R$ ${grandTotal.toFixed(2)}*\n\n` +
      `Por favor, confirmem o tempo estimado para o meu pedido! Muito obrigado!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setOrderSent(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#14110F] border-l border-[#2C2420] shadow-2xl flex flex-col text-[#F5EFEB]"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#2C2420] flex items-center justify-between bg-[#161310]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E31837]/20 border border-[#E31837]/40 flex items-center justify-center text-[#E31837]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-serif text-white">Sua Sacola de Pizzas</h2>
                    <p className="text-xs text-[#A89F93]">
                      {items.length === 0
                        ? 'Nenhum item selecionado'
                        : `${items.reduce((s, i) => s + i.quantity, 0)} ${
                            items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'item' : 'itens'
                          }`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#1E1916] hover:bg-[#2C2420] text-[#A89F93] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Fechar sacola"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lista de Itens */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#A89F93]">
                    <div className="w-16 h-16 rounded-full bg-[#1E1916] border border-[#2C2420] flex items-center justify-center mb-4 text-[#FF6B35]">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Sua sacola está vazia</h3>
                    <p className="text-xs text-[#A89F93] max-w-xs mb-6">
                      Escolha uma de nossas pizzas artesanais assadas na lenha e monte seu pedido agora mesmo.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E31837] to-[#FF6B35] text-white text-sm font-semibold hover:opacity-95 transition-all shadow-md shadow-[#E31837]/20"
                    >
                      Explorar o Cardápio
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center pb-2 border-b border-[#2C2420]/60">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#A89F93]">
                        Itens Selecionados
                      </span>
                      <button
                        onClick={onClearCart}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Esvaziar</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.cartId}
                          className="p-3.5 rounded-xl bg-[#1A1613] border border-[#2C2420] flex gap-3 text-xs"
                        >
                          <img
                            src={item.pizza.image}
                            alt={item.pizza.name}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-white text-sm truncate pr-2">
                                {item.pizza.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.cartId)}
                                className="text-[#6E6359] hover:text-rose-400 p-1"
                                aria-label="Remover item"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <p className="text-[#A89F93] mt-0.5">
                              {item.size === 'broto'
                                ? 'Broto (4 fat.)'
                                : item.size === 'media'
                                ? 'Média (6 fat.)'
                                : 'Grande (8 fat.)'}
                              {item.crust.price > 0 && ` · Borda: ${item.crust.name}`}
                            </p>

                            {item.extras.length > 0 && (
                              <p className="text-[#D8CFBC] text-[11px] mt-0.5">
                                + {item.extras.map((e) => e.name).join(', ')}
                              </p>
                            )}

                            {item.notes && (
                              <p className="text-[#FFB471] italic text-[11px] mt-0.5 truncate">
                                Obs: {item.notes}
                              </p>
                            )}

                            <div className="flex justify-between items-center mt-2 pt-1 border-t border-[#2C2420]/40">
                              <span className="font-bold text-[#FF6B35] text-sm">
                                R$ {item.totalPrice.toFixed(2).replace('.', ',')}
                              </span>
                              <div className="flex items-center gap-2 bg-[#14110F] border border-[#2C2420] rounded-lg px-2 py-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.cartId, -1)}
                                  className="text-[#A89F93] hover:text-white"
                                  aria-label="Diminuir"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-semibold text-white px-1">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.cartId, 1)}
                                  className="text-[#A89F93] hover:text-white"
                                  aria-label="Aumentar"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Opções de Entrega & Pagamento */}
                    <form onSubmit={handleSendOrderToWhatsApp} className="pt-4 space-y-4">
                      {/* Tipo de Pedido */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F93] mb-2">
                          Modalidade do Pedido
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDeliveryType('entrega')}
                            className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                              deliveryType === 'entrega'
                                ? 'bg-[#E31837]/15 border-[#E31837] text-white shadow-sm'
                                : 'bg-[#1A1613] border-[#2C2420] text-[#A89F93]'
                            }`}
                          >
                            <Bike className="w-4 h-4 text-[#FF6B35]" />
                            <span>Entrega em Casa</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeliveryType('retirada')}
                            className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                              deliveryType === 'retirada'
                                ? 'bg-[#E31837]/15 border-[#E31837] text-white shadow-sm'
                                : 'bg-[#1A1613] border-[#2C2420] text-[#A89F93]'
                            }`}
                          >
                            <Store className="w-4 h-4 text-[#FF6B35]" />
                            <span>Retirar na Forneria</span>
                          </button>
                        </div>
                      </div>

                      {/* Dados do Cliente */}
                      <div className="space-y-2">
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Seu nome completo *"
                          className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-3 py-2 text-xs text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837]"
                        />

                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Seu telefone / WhatsApp *"
                          className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-3 py-2 text-xs text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837]"
                        />

                        {deliveryType === 'entrega' && (
                          <textarea
                            required
                            rows={2}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Endereço completo (Rua, Número, Bairro, Apto/Bloco) *"
                            className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-3 py-2 text-xs text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837]"
                          />
                        )}
                      </div>

                      {/* Forma de Pagamento */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F93] mb-2">
                          Forma de Pagamento
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('pix')}
                            className={`p-2 rounded-xl border text-center text-xs transition-all ${
                              paymentMethod === 'pix'
                                ? 'bg-[#FF6B35]/20 border-[#FF6B35] text-white font-bold'
                                : 'bg-[#1A1613] border-[#2C2420] text-[#A89F93]'
                            }`}
                          >
                            <span className="block text-emerald-400 font-semibold text-[10px]">
                              -5% OFF
                            </span>
                            <span>Pix</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('cartao')}
                            className={`p-2 rounded-xl border text-center text-xs transition-all ${
                              paymentMethod === 'cartao'
                                ? 'bg-[#FF6B35]/20 border-[#FF6B35] text-white font-bold'
                                : 'bg-[#1A1613] border-[#2C2420] text-[#A89F93]'
                            }`}
                          >
                            <span className="block text-[10px] text-[#A89F93]">Maquininha</span>
                            <span>Cartão</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('dinheiro')}
                            className={`p-2 rounded-xl border text-center text-xs transition-all ${
                              paymentMethod === 'dinheiro'
                                ? 'bg-[#FF6B35]/20 border-[#FF6B35] text-white font-bold'
                                : 'bg-[#1A1613] border-[#2C2420] text-[#A89F93]'
                            }`}
                          >
                            <span className="block text-[10px] text-[#A89F93]">Na entrega</span>
                            <span>Dinheiro</span>
                          </button>
                        </div>

                        {paymentMethod === 'dinheiro' && (
                          <input
                            type="text"
                            value={changeFor}
                            onChange={(e) => setChangeFor(e.target.value)}
                            placeholder="Precisa de troco para quanto? (Ex: R$ 100)"
                            className="mt-2 w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-3 py-2 text-xs text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837]"
                          />
                        )}
                      </div>

                      {/* Resumo de Valores */}
                      <div className="p-3.5 rounded-xl bg-[#161310] border border-[#2C2420] space-y-1.5 text-xs">
                        <div className="flex justify-between text-[#A89F93]">
                          <span>Subtotal</span>
                          <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                        </div>

                        {deliveryType === 'entrega' && (
                          <div className="flex justify-between text-[#A89F93]">
                            <span>Taxa de Entrega</span>
                            <span>
                              {deliveryFee === 0 ? (
                                <span className="text-emerald-400 font-semibold">Grátis (Pedido &gt; R$ 120)</span>
                              ) : (
                                `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`
                              )}
                            </span>
                          </div>
                        )}

                        {paymentMethod === 'pix' && (
                          <div className="flex justify-between text-emerald-400">
                            <span>Desconto Especial Pix (5%)</span>
                            <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                          </div>
                        )}

                        <div className="pt-2 border-t border-[#2C2420] flex justify-between items-center text-sm font-bold text-white">
                          <span>Total a Pagar</span>
                          <span className="text-base text-[#FF6B35]">
                            R$ {grandTotal.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>

                      {/* Botão de Envio via WhatsApp */}
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#E31837] to-[#FF6B35] hover:from-[#C5112C] hover:to-[#E8551F] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-[#E31837]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                      >
                        <Send className="w-4 h-4" />
                        <span>Confirmar Pedido no WhatsApp</span>
                      </button>

                      <p className="text-[11px] text-center text-[#A89F93] flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pedido enviado diretamente ao nosso forno a lenha</span>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
