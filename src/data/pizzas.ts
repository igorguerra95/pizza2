import { PizzaItem, CrustOption, ExtraTopping } from '../types';

export const CRUST_OPTIONS: CrustOption[] = [
  { id: 'tradicional', name: 'Massa Tradicional Crocante (sem recheio)', price: 0 },
  { id: 'catupiry', name: 'Borda Recheada com Catupiry® Original', price: 14 },
  { id: 'cheddar', name: 'Borda Recheada com Cheddar Inglês Cremoso', price: 14 },
  { id: 'brie-mel', name: 'Borda Especial Queijo Brie com Mel Silvestre', price: 19 },
  { id: 'chocolate', name: 'Borda Vulcão com Chocolate Meio Amargo', price: 16 }
];

export const EXTRA_TOPPINGS: ExtraTopping[] = [
  { id: 'bacon', name: 'Bacon Artesanal Crocante', price: 8 },
  { id: 'alho-poro', name: 'Alho-poró Salteado no Azeite', price: 6 },
  { id: 'azeite-trufado', name: 'Fio de Azeite Trufado Branco', price: 12 },
  { id: 'manjericao', name: 'Manjericão Basílico Extra Fresco', price: 4 },
  { id: 'parmesao', name: 'Parmesão Tipo Grana Ralado na Hora', price: 9 }
];

export const PIZZAS: PizzaItem[] = [
  {
    id: 'margherita-bufala',
    name: 'Margherita Verace di Bufala',
    category: 'tradicionais',
    description: 'Molho de tomate San Marzano D.O.P., mozzarella di bufala artesanal fresca, folhas de manjericão colhidas no dia e fio generoso de azeite extravirgem italiano.',
    price: 68,
    promoPrice: 59,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80',
    isPopular: true,
    isVegetarian: true,
    ingredients: ['Tomates San Marzano D.O.P.', 'Mozzarella di Búfala', 'Manjericão Basílico Fresco', 'Azeite Extravirgem Italiano'],
    pairing: 'Harmoniza com Vinho Chianti ou Cerveja Pilsen Artesanal'
  },
  {
    id: 'pepperoni-rustico',
    name: 'Pepperoni Rústico & Fior di Latte',
    category: 'tradicionais',
    description: 'Fatias generosas de pepperoni curado de alta charcutaria que ganham bordas crocantes no forno a lenha, sobre base cremosa de queijo muçarela e orégano fresco.',
    price: 74,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80',
    isPopular: true,
    spicyLevel: 1,
    ingredients: ['Pepperoni Artesanal Curado', 'Fior di Latte', 'Molho de Tomate Rústico', 'Orégano Fresco da Horta'],
    pairing: 'Harmoniza com Vinho Syrah ou Cerveja IPA Encorpada'
  },
  {
    id: 'quatro-queijos-nobres',
    name: 'Quattro Formaggi Selezione',
    category: 'tradicionais',
    description: 'Harmonia aveludada entre muçarela da serra da Mantiqueira, queijo gorgonzola dolce de pasta mole, provolone defumado lentamente e lascas de parmesão 18 meses.',
    price: 78,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=900&q=80',
    isVegetarian: true,
    ingredients: ['Muçarela da Mantiqueira', 'Gorgonzola Dolce', 'Provolone Curado', 'Parmesão 18 Meses'],
    pairing: 'Harmoniza com Vinho Chardonnay ou Vinho Tinto Merlot'
  },
  {
    id: 'calabresa-artesanal',
    name: 'Calabresa Artesanal & Cebola Roxa',
    category: 'tradicionais',
    description: 'Linguiça calabresa artesanal com moagem rústica e defumação natural em lenha de macieira, lâminas ultrafinas de cebola roxa ao forno e azeitonas pretas azapa.',
    price: 66,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=80',
    isPopular: true,
    ingredients: ['Calabresa Artesanal Defumada', 'Cebola Roxa Laminada', 'Azeitonas Azapa', 'Molho de Tomate Natural'],
    pairing: 'Harmoniza com Cerveja Red Ale ou Chopp Gelado'
  },
  {
    id: 'parma-rucula-grana',
    name: 'Parma Reserva, Rúcula & Grana Padano',
    category: 'especiais',
    description: 'Finalizada após sair do forno incandescente: fatias de Presunto di Parma maturado por 24 meses, folhas tenras de rúcula baby selvagem e lascas generosas de Grana Padano.',
    price: 89,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80',
    isPopular: true,
    isChefSpecial: true,
    ingredients: ['Presunto de Parma D.O.P. 24 meses', 'Rúcula Selvagem Fresca', 'Grana Padano Ralado na Hora', 'Redução Balsâmica de Modena'],
    pairing: 'Harmoniza com Vinho Tinto Brunello di Montalcino ou Primitivo'
  },
  {
    id: 'burrata-pesto-pistache',
    name: 'Burrata Cremosa & Pesto de Pistache',
    category: 'especiais',
    description: 'Centro de burrata artesanal cremosa com coração de stracciatella, pesto fresco feito no pilão com pistaches sicilianos tostados, tomatinhos confitados e raspas de limão siciliano.',
    price: 94,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    isVegetarian: true,
    ingredients: ['Burrata de Búfala Inteira', 'Pesto de Pistache Siciliano', 'Tomate Sweet Grape Confit', 'Raspas de Limão Siciliano'],
    pairing: 'Harmoniza com Vinho Branco Sauvignon Blanc ou Espumante Brut'
  },
  {
    id: 'costela-barbecue-goiabada',
    name: 'Costela Angus 12h & Barbecue de Goiabada',
    category: 'especiais',
    description: 'Costela bovina de corte nobre desfiada, cozida em fogo brando por 12 horas, queijo caccio cavalo derretido, cebola crispy e gotas de barbecue artesanal com goiabada cascão.',
    price: 86,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    isChefSpecial: true,
    ingredients: ['Costela Angus Desfiada 12h', 'Queijo Caccio Cavalo', 'Barbecue de Goiabada Cascão', 'Cebola Crispy Dourada'],
    pairing: 'Harmoniza com Vinho Malbec Argentino ou Cerveja Stout'
  },
  {
    id: 'cogumelos-trufados',
    name: 'Tartufata de Funghi Selvatici',
    category: 'especiais',
    description: 'Blend de cogumelos frescos (Paris, Shimeji e Portobello) salteados no alho negro e vinho branco, base de queijo taleggio e gotas perfumadas de azeite trufado de San Miniato.',
    price: 88,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=80',
    isVegetarian: true,
    ingredients: ['Mix de Cogumelos Selvagens', 'Azeite de Trufas Brancas', 'Queijo Taleggio & Fior di Latte', 'Tomilho Limão Fresco'],
    pairing: 'Harmoniza com Vinho Pinot Noir ou Nebbiolo'
  },
  {
    id: 'nutella-morango-amendoas',
    name: 'Nutella Pura, Morangos & Amêndoas Tostadas',
    category: 'doces',
    description: 'Massa fina assada no forno a lenha, camada espessa de creme de avelã Nutella genuína, morangos frescos selecionados e lâminas de amêndoas douradas na manteiga.',
    price: 52,
    promoPrice: 46,
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=900&q=80',
    isPopular: true,
    ingredients: ['Nutella® Genuína', 'Morangos Frescos Orgânicos', 'Amêndoas em Lâminas Crocantes', 'Açúcar de Confeiteiro'],
    pairing: 'Perfeito com Café Espresso ou Vinho do Porto'
  },
  {
    id: 'banana-doce-de-leite-vicosa',
    name: 'Banana Flambada & Doce de Leite Viçosa',
    category: 'doces',
    description: 'Premiado doce de leite de Viçosa derretido, rodelas de banana nanica caramelizadas no fogo, queijo canastra suave e toque aromático de canela em pó do Ceilão.',
    price: 48,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Doce de Leite Viçosa', 'Bananas Caramelizadas', 'Queijo Canastra Meia Cura', 'Canela do Ceilão'],
    pairing: 'Excelente com Sorvete Artesanal de Baunilha'
  },
  {
    id: 'vinho-chianti-classico',
    name: 'Vinho Tinto Italiano Chianti DOCG 750ml',
    category: 'bebidas',
    description: 'Vinho toscano encorpado, com notas de cerejas maduras e toques de especiarias finas. Acidez equilibrada ideal para realçar o sabor dos tomates e queijos assados.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Uvas Sangiovese 100%', 'Região da Toscana - Itália', 'Teor Alcoólico: 13,5%'],
    pairing: 'Ideal para acompanhar as pizzas tradicionais e de carnes'
  },
  {
    id: 'cerveja-artesanal-ipa',
    name: 'Cerveja Artesanal Forneria IPA 500ml',
    category: 'bebidas',
    description: 'Produzida sob medida para a nossa pizzaria por mestre-cervejeiro local: amargor marcante equilibrado, notas cítricas e aroma intenso de lúpulos nobres.',
    price: 28,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=900&q=80',
    ingredients: ['Malte de Cevada Selecionado', 'Lúpulos Nobres Aromáticos', 'Água Mineral da Serra'],
    pairing: 'Excelente com pizzas picantes e com queijos intensos'
  }
];
