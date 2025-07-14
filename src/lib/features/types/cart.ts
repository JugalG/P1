
// Cart Item Props (CartItem.tsx)
import {Product} from './product'
export interface CartItemProps {
  product: Product;
  onIncrease: (product:Product) => void;
  onDecrease: (product:Product) => void;
  onDelete: (product:Product) => void;
};
// export type ProductCart = {
//   quantity: number;
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   category: string;
// };

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