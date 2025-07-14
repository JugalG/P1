import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

export type cart = {
  cartProducts: Product[];
};

export type deleteCartItemType = {
  id: string;
};

const initialState: cart = {
  cartProducts: [],
};

type decreaseCartItemType={
    product: Product;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Product[]>){
      state.cartProducts = action.payload;
    },
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.cartProducts.find((item) => {
        return item.id === action.payload.id;
      });

      if (existingItem) {
          existingItem.quantity = existingItem.quantity+ 1;
      } else {
         state.cartProducts.push({  ...action.payload, quantity: 1 });
      }
      return state;
    },

    removeFromCart(state, action: PayloadAction<decreaseCartItemType>) {
      const {cartProducts} :{cartProducts:Product[]} = state;
      if (cartProducts && action.payload.product.id) {
        const foundItem = cartProducts.find((item)=>
            item.id === action.payload.product.id
        );
        
        
        if(foundItem && foundItem.quantity>1){
            foundItem.quantity -= 1;            
        }else if(foundItem && foundItem.quantity == 1){
          console.log('quantity zero hogaya');
          
            state.cartProducts= cartProducts.filter((item)=> item.id !== action.payload.product.id );
        }
      }
      else throw new Error('Data could not be loaded.');      
      return state;
    },

    deleteItem(state, action: PayloadAction<deleteCartItemType>) {
        if (state.cartProducts && action.payload.id) {
            state.cartProducts= state.cartProducts.filter((items) => items.id !== action.payload.id);
        }
    return state;

    },

    emptyCart(state) {
      state.cartProducts = [];
      return state;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
