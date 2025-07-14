/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@/app/login/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock sessionStorage
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

// Mock fetch
global.fetch = jest.fn();
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});


describe('Login Page', () => {
  const pushMock = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('should render login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should redirect to /homepage if user is already authenticated', async () => {
    sessionStorage.setItem(
      'userSession',
      JSON.stringify({ user: { id: '123' }, loginTime: Date.now() })
    );

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ authenticated: true }),
      status: 200,
    });

    render(<Login />);
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/homepage');
    });
  });

    it('should login and redirect on valid credentials', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
        id: '1',
        name: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        }),
    });

    render(<Login />);
    await userEvent.type(screen.getByLabelText(/Email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/Password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/login', expect.anything());
        expect(sessionStorage.getItem('userSession')).toBeTruthy();
        expect(pushMock).toHaveBeenCalledWith('/homepage');
    });
    });


  it('should alert on invalid credentials', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
  });

  render(<Login />);
  await userEvent.type(screen.getByLabelText(/Email address/i), 'invalid@example.com');
  await userEvent.type(screen.getByLabelText(/Password/i), 'wrongpassword');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Invalid email or password');
  });
});

}

);

afterAll(() => {
  (window.alert as jest.Mock).mockRestore();
});

