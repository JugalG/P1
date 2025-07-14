export type Product = {

  quantity: number;
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description:string;
  rating:{
    rate:number;
    count:number;
  }
};
//summary-card-function-prop
// export interface ProductProps {
//     product: Product
// }

// Cart Item Props (CartItem.tsx)
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

export type deleteCartItemType = {
  id: string;
};