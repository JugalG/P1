
import '@/styles/Cart.css'
import '@/styles/CartItem.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/features/store/store'
import type { Product} from '@/lib/features/types/product'
import CartItem from './CartItem'
import type { CartProps } from '@/lib/features/types/cart';
import Link from 'next/dist/client/link'

export default function Cart({ onIncrease, onDecrease, onEmptyCart, onDelete }: CartProps) {

    const cartState = useSelector((state: RootState) => state.cart);

    // console.log("Cart State from Cart.tsx: ",cartState.cartProducts);
    const cartItems: Product[] = cartState.cartProducts;
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);



    return (
        <div id="CartDiv " className='CartDiv'>

            <div className=" govuk-margin-top-10  govuk-background-light-grey ">
                <h2 className=" govuk-heading-m govuk-font-size-17">CART</h2>

                <div className=" cartTitleItemProceQuantity govuk-margin-bottom-2 govuk-border-bottom  ">
                    {/* <strong>ITEM</strong><strong>PRICE</strong><strong>QUANTITY</strong> */}
                </div>

                {cartItems.length === 0 ? (
                    <p className="govuk-body-m govuk-">Cart is empty</p>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <CartItem key={item.id} product={item} onIncrease={onIncrease} onDecrease={onDecrease} onDelete={onDelete} />
                        ))}

                    </>
                )}

                <div className=" govuk-margin-top-0">
                    <p className="cartTotal govuk-body-m "><strong>Total:</strong> £{total.toFixed(2)}</p>
                    <div className='cartActionButtonsDiv'>
                        {/* <button className="" type="button">
                            <Link href="/checkout">Checkout</Link>
                        </button> */}
                        <Link href="/checkout" className="cartActionButton govuk-button" onClick={onEmptyCart}>Checkout</Link>
                        <button
                            type="button"
                            className="cartActionButton govuk-button govuk-button--warning govuk-margin-top-0"
                            onClick={onEmptyCart}
                        >Empty Cart</button>
                    </div>
                </div>
            </div>
        </div >
    )
}