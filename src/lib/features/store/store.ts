
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '@/lib/features/modal/modalSlice';
import cartReducer from '@/lib/features/cart/cartSlice';
import dataReducer from '@/lib/features/product/productSlice';
export const createStore =()=>{
  return configureStore({
    reducer: {
      cart: cartReducer,
      data: dataReducer,
    },
  });
};

// const store = configureStore({
//     reducer: {
//       modal: modalReducer,
//     },
//   });
// export default store;

export type AppStore = ReturnType<typeof createStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch