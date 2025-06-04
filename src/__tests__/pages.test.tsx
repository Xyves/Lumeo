/* eslint-disable react/jsx-no-undef */
import { useRouter } from 'next/router';
import { render, screen } from '@testing-library/react';
import React from 'react';

import LoginWindow from '@/components/Home/LoginForm';
import PopupProvider from '@/context/PopupContext';
/* eslint-disable no-sequences */
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
describe('MyComponent route-based rendering', () => {
  it('shows login form when on /login', () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: '/' });

    render(
      <PopupProvider>
        <LoginWindow />
      </PopupProvider>
    );

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
