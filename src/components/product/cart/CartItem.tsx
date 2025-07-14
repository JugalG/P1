
import "@/styles/CartItem.css";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import type { CartItemProps } from "@/lib/features/types/cart";

export default function CartItem({product, onIncrease, onDecrease, onDelete}: CartItemProps) {
    
  

  return (
    <>
      <div id="MainCartItemDiv" className=" ">
        <div className="cartItemTitle govuk-grid-row-full">
          <strong>{product.title}</strong>
        </div>
        <div className="cartImagePriceActionsDiv">
          <div className="cartItemImage ">
          
            <Image src={product.image} alt={product.title} width={200} height={250} className="card-image" style={{objectFit: 'contain', width: 'auto', height:'auto'}} />
          </div>

          <div className="CartActionsDiv">
            <div className="CartItemActionButtonDiv-parent">
              <div className="CartItemActionButtonDiv ">
                <button
                  className="button-plus-minus minus "
                  type="button"
                  onClick={() => onDecrease(product)}
                >-</button>
                <span className="">{product.quantity}</span>
                <button
                  className="button-plus-minus plus"
                  type="button"
                  onClick={() => onIncrease(product)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-item-price-and-delete-div">
              <div className="itemPriceDiv">
                <p className="itemPrice">£{product.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => {
                  onDelete(product);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaTrashAlt style={{ fontSize: "1.2em" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
