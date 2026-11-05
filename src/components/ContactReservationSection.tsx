import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Clock,
  Calendar,
  Users,
  Send,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  UtensilsCrossed,
  MapPin,
  HeartHandshake,
} from 'lucide-react';
import { ReservationForm } from '../types';

export const ContactReservationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reserva' | 'mensagem'>('reserva');

  // Estado do formulário de reserva
  const [reservation, setReservation] = useState<ReservationForm>({
    name: '',
    phone: '',
    date: '',
    time: '20:00',
    guests: 2,
    notes: '',
  });

  // Estado de mensagem simples
  const [messageForm, setMessageForm] = useState({
    name: '',
    phone: '',
    subject: 'Dúvidas Gerais / Atendimento',
    message: '',
  });

  const [submittedReservation, setSubmittedReservation] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text =
      `🍷 *SOLICITAÇÃO DE RESERVA — PIZZARIA TESTE*\n` +
      `-----------------------------------------\n` +
      `👤 *Nome:* ${reservation.name}\n` +
      `📱 *Telefone:* ${reservation.phone}\n` +
      `📅 *Data:* ${reservation.date}\n` +
      `⏰ *Horário:* ${reservation.time}\n` +
      `👥 *Número de Pessoas:* ${reservation.guests}\n` +
      (reservation.notes ? `📝 *Observações / Ocasião:* ${reservation.notes}\n` : '') +
      `-----------------------------------------\n` +
      `Gostaria de verificar a disponibilidade de mesa para nós. Muito obrigado!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    setSubmittedReservation(true);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text =
      `💬 *MENSAGEM DE CONTATO — PIZZARIA TESTE*\n` +
      `-----------------------------------------\n` +
      `👤 *Nome:* ${messageForm.name}\n` +
      `📱 *Telefone:* ${messageForm.phone}\n` +
      `📌 *Assunto:* ${messageForm.subject}\n` +
      `📝 *Mensagem:* ${messageForm.message}\n` +
      `-----------------------------------------`;

    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    setSubmittedMessage(true);
  };

  return (
    <section id="contato" className="py-24 bg-[#0B0908] relative text-[#F5EFEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FF6B35] mb-2">
            <UtensilsCrossed className="w-4 h-4 text-[#E31837]" />
            <span>Atendimento & Reservas</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight mb-4">
            Venha viver a experiência do forno a lenha
          </h2>
          <p className="text-sm sm:text-base text-[#D8CFBC] font-light leading-relaxed">
            Reserve sua mesa com antecedência para jantares a dois, reuniões em família ou celebrações especiais. Atendimento caloroso e acolhedor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Coluna Esquerda: Informações de Atendimento */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#14110F] border border-[#2C2420] shadow-xl space-y-6">
              <h3 className="font-serif font-bold text-2xl text-white">
                Canais de Atendimento
              </h3>

              <div className="space-y-4 text-sm">
                {/* Horário */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A1613] border border-[#2C2420]">
                  <div className="w-10 h-10 rounded-lg bg-[#E31837]/20 border border-[#E31837]/40 flex items-center justify-center text-[#FF6B35] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-0.5">
                      Horário de Funcionamento
                    </span>
                    <p className="text-xs text-[#D8CFBC]">
                      Terça a Domingo: das 18h00 às 23h45
                    </p>
                    <p className="text-[11px] text-[#A89F93] mt-1">
                      Segunda-feira: Fechado para descanso e maturação do levain
                    </p>
                  </div>
                </div>

                {/* Telefone e WhatsApp */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A1613] border border-[#2C2420]">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-0.5">
                      Telefone & WhatsApp Direto
                    </span>
                    <p className="text-xs text-[#D8CFBC]">
                      Atendimento em tempo real durante todo o expediente
                    </p>
                    <a
                      href="https://api.whatsapp.com/send?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20a%20Pizzaria%20Teste."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#FF6B35] font-semibold hover:underline mt-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Iniciar conversa no WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Eventos e Aniversários */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A1613] border border-[#2C2420]">
                  <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/20 border border-[#FF6B35]/40 flex items-center justify-center text-[#FF6B35] shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block mb-0.5">
                      Eventos & Confraternizações
                    </span>
                    <p className="text-xs text-[#D8CFBC]">
                      Espaço reservado para aniversários, reuniões corporativas e grupos acima de 10 pessoas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Reserva / Mensagem */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#14110F] border border-[#2C2420] shadow-2xl">
              {/* Abas do Formulário */}
              <div className="flex gap-2 p-1.5 bg-[#1A1613] border border-[#2C2420] rounded-xl mb-8">
                <button
                  type="button"
                  onClick={() => setActiveTab('reserva')}
                  className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'reserva'
                      ? 'bg-gradient-to-r from-[#E31837] to-[#FF6B35] text-white shadow-md'
                      : 'text-[#A89F93] hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reservar Mesa no Salão</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('mensagem')}
                  className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'mensagem'
                      ? 'bg-gradient-to-r from-[#E31837] to-[#FF6B35] text-white shadow-md'
                      : 'text-[#A89F93] hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </div>

              {/* Aba de Reserva de Mesa */}
              {activeTab === 'reserva' && (
                <>
                  {submittedReservation ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif font-bold text-2xl text-white">
                        Solicitação Encaminhada!
                      </h4>
                      <p className="text-sm text-[#D8CFBC] max-w-md mx-auto leading-relaxed">
                        Sua mensagem foi gerada e enviada via WhatsApp. Nossa equipe de recepção confirmará sua mesa em poucos minutos.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedReservation(false)}
                        className="text-xs text-[#FF6B35] underline hover:text-[#FF8A5B] pt-2 block mx-auto"
                      >
                        Fazer outra reserva
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleReservationSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                            Seu Nome Completo *
                          </label>
                          <input
                            type="text"
                            required
                            value={reservation.name}
                            onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                            placeholder="Ex: Carlos Eduardo Silva"
                            className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                            Telefone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={reservation.phone}
                            onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                            className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                            Data Desejada *
                          </label>
                          <input
                            type="date"
                            required
                            value={reservation.date}
                            onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                            className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] focus:outline-none focus:border-[#E31837] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                            Horário Previsto *
                          </label>
                          <select
                            value={reservation.time}
                            onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                            className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] focus:outline-none focus:border-[#E31837] transition-colors"
                          >
                            <option value="18:30">18:30</option>
                            <option value="19:00">19:00</option>
                            <option value="19:30">19:30</option>
                            <option value="20:00">20:00</option>
                            <option value="20:30">20:30</option>
                            <option value="21:00">21:00</option>
                            <option value="21:30">21:30</option>
                            <option value="22:00">22:00</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                            Qtd. de Pessoas *
                          </label>
                          <select
                            value={reservation.guests}
                            onChange={(e) => setReservation({ ...reservation, guests: Number(e.target.value) })}
                            className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] focus:outline-none focus:border-[#E31837] transition-colors"
                          >
                            <option value={1}>1 pessoa</option>
                            <option value={2}>2 pessoas (Casal)</option>
                            <option value={3}>3 pessoas</option>
                            <option value={4}>4 pessoas (Família)</option>
                            <option value={5}>5 a 6 pessoas</option>
                            <option value={8}>7 a 10 pessoas</option>
                            <option value={15}>Mais de 10 pessoas</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                          Observações ou Ocasião Especial (Opcional)
                        </label>
                        <textarea
                          rows={3}
                          value={reservation.notes}
                          onChange={(e) => setReservation({ ...reservation, notes: e.target.value })}
                          placeholder="Ex: Aniversário de casamento, preferência por mesa próxima ao jardim, cadeira infantil..."
                          className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837] transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#E31837] to-[#FF6B35] hover:from-[#C5112C] hover:to-[#E8551F] text-white font-bold text-sm py-4 rounded-xl shadow-xl shadow-[#E31837]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                        <span>Confirmar Reserva via WhatsApp</span>
                      </button>
                    </form>
                  )}
                </>
              )}

              {/* Aba de Mensagem Rápida */}
              {activeTab === 'mensagem' && (
                <>
                  {submittedMessage ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="font-serif font-bold text-2xl text-white">
                        Mensagem Enviada!
                      </h4>
                      <p className="text-sm text-[#D8CFBC] max-w-md mx-auto leading-relaxed">
                        Obrigado por falar conosco! Responderemos prontamente no seu telefone ou WhatsApp.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmittedMessage(false)}
                        className="text-xs text-[#FF6B35] underline hover:text-[#FF8A5B] pt-2 block mx-auto"
                      >
                        Enviar outra mensagem
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleMessageSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                            Seu Nome *
                          </label>
                          <input
                            type="text"
                            required
                            value={messageForm.name}
                            onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })}
                            placeholder="Seu nome"
                            className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                            Telefone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={messageForm.phone}
                            onChange={(e) => setMessageForm({ ...messageForm, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                            className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                          Assunto da Mensagem *
                        </label>
                        <select
                          value={messageForm.subject}
                          onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                          className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] focus:outline-none focus:border-[#E31837] transition-colors"
                        >
                          <option value="Dúvidas Gerais / Atendimento">Dúvidas Gerais / Atendimento</option>
                          <option value="Orçamento para Evento Privativo">Orçamento para Evento Privativo</option>
                          <option value="Cardápio Especial / Alergênicos">Cardápio Especial / Alergênicos</option>
                          <option value="Parcerias e Fornecedores">Parcerias e Fornecedores</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#FFB471] mb-2">
                          Sua Mensagem *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={messageForm.message}
                          onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                          placeholder="Como podemos te ajudar hoje?"
                          className="w-full bg-[#1A1613] border border-[#2C2420] rounded-xl px-4 py-3 text-sm text-[#F5EFEB] placeholder-[#6E6359] focus:outline-none focus:border-[#E31837] transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#E31837] to-[#FF6B35] hover:from-[#C5112C] hover:to-[#E8551F] text-white font-bold text-sm py-4 rounded-xl shadow-xl shadow-[#E31837]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensagem</span>
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
