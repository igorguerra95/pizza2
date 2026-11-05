export type PizzaCategory = 'todas' | 'tradicionais' | 'especiais' | 'doces' | 'bebidas';

export type PizzaSize = 'broto' | 'media' | 'grande';

export interface PizzaItem {
  id: string;
  name: string;
  category: 'tradicionais' | 'especiais' | 'doces' | 'bebidas';
  description: string;
  price: number;
  promoPrice?: number;
  image: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isChefSpecial?: boolean;
  spicyLevel?: number; // 0 a 3
  ingredients: string[];
  pairing?: string; // sugestão de harmonização (ex: vinho tinto, cerveja artesanal)
}

export interface CrustOption {
  id: string;
  name: string;
  price: number;
}

export interface ExtraTopping {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartId: string;
  pizza: PizzaItem;
  size: PizzaSize;
  sizePrice: number;
  crust: CrustOption;
  extras: ExtraTopping[];
  notes?: string;
  quantity: number;
  totalPrice: number;
}

export interface ReservationForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}
