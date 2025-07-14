'use client';

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from '@/lib/features/cart/cartSlice'
import type { Product } from "@/lib/features/types/product";

type pscbType ={
  product: Product;
  onQuickView: ()=>void;
}

const ProductSummaryCardButtons = ({product,onQuickView}:pscbType ) => {
  const dispatch = useDispatch();
  
  


  function handleAdddToCartClick(product: Product) {
    dispatch(cartActions.addToCart(product))
  }

  return (
    <div className="card-buttons">
      <button className="govuk-button govuk-button-cust" onClick={() => handleAdddToCartClick(product)}>Add Cart</button>
      <button className="govuk-button govuk-button--secondary govuk-button-cust" onClick={onQuickView}>Quick View</button>
    </div>
  );
};
export default ProductSummaryCardButtons;