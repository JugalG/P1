import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickViewModalCloseButton from '@/components/product/productCard/productQuickView/ProductQuickViewModalCloseButton';

describe('QuickViewModalCloseButton', () => {
  it('renders the close button', () => {
    render(<QuickViewModalCloseButton onCloseAction={() => {}} />);
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onCloseAction when clicked', async () => {
    const user = userEvent.setup();
    const onCloseMock = jest.fn();
    render(<QuickViewModalCloseButton onCloseAction={onCloseMock} />);
    const button = screen.getByRole('button', { name: /close/i });
    await user.click(button);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('is focusable and accessible', () => {
    render(<QuickViewModalCloseButton onCloseAction={() => {}} />);
    const button = screen.getByRole('button', { name: /close/i });
    button.focus();
    expect(button).toHaveFocus();
  });
});
