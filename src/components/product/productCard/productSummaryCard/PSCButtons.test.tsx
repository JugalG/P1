import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductSummaryCardButtons from '@/components/product/productCard/productSummaryCard/ProductSummaryCardButtons';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/lib/features/cart/cartSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();
(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);



describe('ProductSummaryCardButtons', () => {
  const product = {
    id: '1',
    name: 'Test Product',
    price: 100,
    description: 'A test product',
    image: 'test.jpg',
    quantity: 10,
    title: 'Test ButtonCart Item',
    category: "men's clothing",
    rating: {
      rate: 4,
      count: 200,
    }
    ,

  };

  beforeEach(() => {


    jest.clearAllMocks(); 
  });

  it('shouldd perform disspatch addTOCart with the product when add to cart is clicked', async()=>{
    render(<ProductSummaryCardButtons product={product} onQuickView={jest.fn()} /> );
    const addButton = screen.getByText(/Add Cart/i);
    await userEvent.click(addButton);
    expect(mockDispatch).toHaveBeenCalledWith(cartActions.addToCart(product));
  });
  it('should dispatch action with the type "cart/addToCart"',async()=>{
    render(<ProductSummaryCardButtons product={product} onQuickView={jest.fn()} />);
    const addButton = screen.getByText(/Add Cart/i);
    await userEvent.click(addButton);
    const dispatchedAction = mockDispatch.mock.calls[0][0] ;
    expect(dispatchedAction.type).toBe('cart/addToCart');

  })



  it('should dispatch addToCart with the product when Add Cart is clicked', async () => {
    render(
      <ProductSummaryCardButtons
        product={product}
        onQuickView={jest.fn()}
      />
    );

    const addButton = screen.getByText(/Add Cart/i);
    await userEvent.click(addButton); 
    expect(mockDispatch).toHaveBeenCalledWith(cartActions.addToCart(product));
  });

  it('should call onQuickView when Quick View is clicked', async () => {
    const quickViewMock = jest.fn();
    render(
      <ProductSummaryCardButtons
        product={product}
        onQuickView={quickViewMock}
      />
    );

    const quickViewButton = screen.getByText(/Quick View/i);
    await userEvent.click(quickViewButton); 
    expect(quickViewMock).toHaveBeenCalled();
  });
});
