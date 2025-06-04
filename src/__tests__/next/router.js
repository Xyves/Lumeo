jest.mock('next/router', () => ({
  useRouter: jest.fn(),
  Router: {
    push: jest.fn(),
  },
}));
