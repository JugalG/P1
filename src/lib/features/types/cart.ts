import {Product} from './product'
export interface CartItemProps {
  product: Product;
  onIncrease: (product:Product) => void;
  onDecrease: (product:Product) => void;
  onDelete: (product:Product) => void;
};

export type cart = {
  cartProducts: Product[];
};

export interface CartProps {
    onIncrease: (product: Product) => void
    onDecrease: (product: Product) => void
    onEmptyCart: () => void
    onDelete: (product: Product) => void
}

export type deleteCartItemType = {
  id: string;
};