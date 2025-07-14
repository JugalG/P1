import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
     fetchProductsStart(state) {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
      state.loading = false
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
  }
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;

export default productSlice.reducer;