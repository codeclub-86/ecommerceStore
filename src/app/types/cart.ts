export type Variant = Record<string, string>;

export interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  variant?: Variant; // e.g. { color: 'Black', size: 'M' }
}

export interface CartItem extends Product {
  uid: string; // unique key for product + variant combo
  quantity: number;
}
