import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store/store";
import { cartActions } from "@/lib/features/cart/cartSlice";
import { Product } from "@/lib/features/types/product";
import { fetchUserCart, syncCartWithServer } from "@/lib/api/api";


export default function useCartSync(userId: string) {
  const dispatch = useDispatch();
  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );
  const isInitialLoad = useRef(true);
  // console.log("cart Sync function called: Cart synced");
  useEffect(() => {
    if(userId ==='') return;

    const fetchCartFromServer = async () => {
      try {
        const serverCart = await fetchUserCart(userId);
        const cleanedProducts: Product[] = Object.values(serverCart).map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
            category: item.category,
            description: item.description,
            quantity: item.quantity ?? 1,
            rating: {
              rate: item.rating?.rate ?? 0,
              count: item.rating?.count ?? 0,
            },
          })
        );

        // const cartArray: Product[] = cleanedProducts;
        // console.log("Object Values user Cart: ",cartArray);

        dispatch(cartActions.emptyCart());
        // cleanedProducts.forEach((item) => {
          //   for (let i = 0; i < item.quantity; i++) {
            //     // console.log("Added to cart: ",item);
            //     dispatch(cartActions.addToCart(item));
            //   }
          // });
          dispatch(cartActions.setCart(cleanedProducts));
      } catch (error) {
        console.error("Error loading cart:", error);
        dispatch(cartActions.emptyCart());
      }
    };

    fetchCartFromServer();
  }, [dispatch, userId]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const syncCartToServer = async () => {
      try {
        if (Object.keys(cartProducts).length !== 0 ||(Object.keys(cartProducts).length === 0 && isInitialLoad.current== false)) {
          const res = await syncCartWithServer(userId, cartProducts);
          // console.log("SyncCartToServer API Response:",res.json());
        } else {
          throw new Error("Cart empty, no need to update");
        }
      } catch (error) {
        console.error("Error syncing cart to server:", error);
      }
    };
    if(userId.length>1){

      syncCartToServer();
    }
  }, [cartProducts, userId]);
}
