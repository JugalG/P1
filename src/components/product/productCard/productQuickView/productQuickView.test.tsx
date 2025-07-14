import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductQuickView from '@/components/product/productCard/productQuickView/ProductQuickView';

const mockProduct = {
  id: '1',
  title: 'Test Product',
  price: 99.99,
  category: 'Test Category',
  description: 'A description of the product',
  image: '/test.jpg',
  quantity: 1,
  rating: {
    rate: 4.5,
    count: 120,
  },
};

describe('ProductQuickView', () => {
  it('renders product information correctly', () => {
    render(<ProductQuickView product={mockProduct} onClose={() => {}} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Price: €99.99')).toBeInTheDocument();
    expect(screen.getByText('Category: Test Category')).toBeInTheDocument();
    expect(screen.getByText(/Description:/)).toHaveTextContent(mockProduct.description);
    expect(screen.getByText('Rating: 4.5')).toBeInTheDocument();
  });

  it('calls onClose when ESC key is pressed', async () => {
    const user = userEvent.setup();
    const mockOnClose = jest.fn();
    render(<ProductQuickView product={mockProduct} onClose={mockOnClose} />);

    await user.keyboard('{Escape}');
    expect(mockOnClose).toHaveBeenCalledWith(false);
  });

  it('focuses the close button when modal appears', () => {
    render(<ProductQuickView product={mockProduct} onClose={() => {}} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toHaveFocus();
  });
});
