'use client';
import Cart from "./Cart";
import { useDispatch } from "react-redux";
import { cartActions } from "@/lib/features/cart/cartSlice";
import type { Product, userType } from "@/lib/features/types/product";
import useCartSync from "@/lib/features/hooks/useCartSync";
import { emptyUserCart, updateUserCart, updateUserCartItem } from "@/lib/api/api";
import { getSessionUser } from "@/lib/features/utilities/session";
import usePageRouter from "@/lib/features/hooks/router";
import { useEffect, useState } from "react";


export default function CartWrapper() {
  const [user,setUser] =useState<userType|null>(null);
  const router = usePageRouter();
  const dispatch = useDispatch();
  const userId = user?.id?? '';
    useCartSync(userId);
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch('/api/session',{
            method:'GET',
            credentials:'include'
          });
          const data = await res.json();
    
          if (res.ok && data.authenticated) {
            // router('/homepage');
              const userFromSession = getSessionUser();
              console.log('getSessionUserHook: ',{userFromSession});
              setUser(userFromSession);
          } else {
            console.log('Not authenticated. Redirecting...');
            router('/login');
          }
        } catch (err) {
          console.error('Auth check failed:', err);
        }
      };
    checkAuth();
  }, []);
  
  
  // const userId = '100';


  if(!user) return ;
    const handleIncrease = async (product:Product) => {
      dispatch(cartActions.addToCart(product));
      await updateUserCartItem(userId,{...product, quantity: product.quantity+1});
      console.log("Increase: update user api triggered ");
    };
  
    const handleDecrease = async (product:Product) => {
      dispatch(cartActions.removeFromCart( product));
      if(product.quantity>1){
        await updateUserCartItem(userId,{...product, quantity: product.quantity-1});
      }else{
       
        await updateUserCart(userId,{...product});
        
      }
      console.log("Decrease: update user api triggered ");
  
    };
  
    const handleEmpty = async () =>{ 
      dispatch(cartActions.emptyCart()); 
      await emptyUserCart(userId); 
      console.log("Emptied cart using API");
    }
  
    const handleOnDeleteItem = async (product:Product) => {
      dispatch(cartActions.deleteItem({id:product.id}));
  
    }; 
    
    return (
      <Cart
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onEmptyCart={handleEmpty}
        onDelete={handleOnDeleteItem}
      />
    );
  
}
