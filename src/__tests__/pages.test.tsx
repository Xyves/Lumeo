/* eslint-disable react/jsx-no-undef */
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';

import LoginWindow from '@/components/Home/LoginForm';
import PopupProvider from '@/context/PopupContext';

afterEach(() => {
  cleanup();
});
/* eslint-disable no-sequences */

const mockPush = jest.fn();
// Then mock next/navigation (for app router)
const mockedRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  pathname: '/login',
};
jest.mock('next/router', () => ({
  useRouter: () => mockedRouter,
}));
describe('MyComponent route-based rendering', () => {
  it('shows login form when on /login', () => {
    render(
      <PopupProvider>
        <LoginWindow />
      </PopupProvider>
    );

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
describe('Login action', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/',
    });
  });
  const setup = () => {
    render(
      <PopupProvider>
        <LoginWindow />
      </PopupProvider>
    );
    const username = screen.getByRole('textbox', { name: /name/i });
    const password = screen.getByLabelText(/password/i);
    return { username, password };
  };
  it('logs in with valid credentials', async () => {
    const { username, password } = setup();
    userEvent.type(username, 'xch');
    userEvent.type(password, 'Xch2137');

    const loginButton = screen.getByTestId('login-button');
    userEvent.click(loginButton);
    screen.debug();
    const popup = await screen.findByText(/Welcome back/i);
    expect(popup).toBeVisible();
    expect(await expect(popup).toBeVisible());
    expect(mockedRouter.push).not.toHaveBeenCalled();
  });
});
