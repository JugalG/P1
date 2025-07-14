import cartReducer, { cartActions } from '@/lib/features/cart/cartSlice';
import { Product } from '@/lib/features/types/product';
export type cart = {
  cartProducts: Product[];
};

export type deleteCartItemType = {
  id: string;
};

const testProduct: Product = {
  id: '1',
  title: 'Test Title',
  price: 100,
  description: 'A test product',
  image: 'test.jpg',
  quantity: 1,
  category: 'test',
  rating: {
    rate: 4,
    count: 200,
  }
};

describe('cartSlice', () => {
  it('should return the initial state', () => {
    expect(cartReducer({cartProducts:[]}, { type: "@@INIT" })).toEqual({ cartProducts:[] });
  });

  it('should add product to cart', () => {
    const state = cartReducer({cartProducts:[]}, cartActions.addToCart(testProduct));
    expect(state.cartProducts).toHaveLength(1);
    expect(state.cartProducts[0].id).toBe('1');
    expect(state.cartProducts[0].quantity).toBe(1);
  });

  it('should increase quantity if product is already in cart', () => {
    const State = { cartProducts: [{...testProduct}] };
    const state = cartReducer(State, cartActions.addToCart(testProduct));
    expect(state.cartProducts).toHaveLength(1);
    expect(state.cartProducts[0].quantity).toBe(2);
  });

  it('should decrease quantity if quantity > 1 on removeFromCart', () => {
    const stateWithTwo = { cartProducts: [{ ...testProduct,quantity:2}] };
    const state = cartReducer(stateWithTwo, cartActions.removeFromCart(testProduct));
    expect(state.cartProducts[0].quantity).toBe(1);
  });

  it('should remove product if quantity is 1 on removeFromCart', () => {
    const stateWithOne = { cartProducts: [{ ...testProduct, quantity: 1 }] };
    const state = cartReducer(stateWithOne, cartActions.removeFromCart(testProduct));
    expect(state.cartProducts).toHaveLength(0);
  });

  it('should delete product from cart', () => {
    const stateWithOne = { cartProducts: [{...testProduct,id:'1'}] };
    const state = cartReducer(stateWithOne, cartActions.deleteItem(testProduct));
    expect(state.cartProducts).toHaveLength(0);
  });

  it('should empty the cart', () => {
    const stateWithProducts = { cartProducts: [testProduct, { ...testProduct, id: '2' }] };
    const state = cartReducer(stateWithProducts, cartActions.emptyCart());
    expect(state.cartProducts).toHaveLength(0);
  });
});
