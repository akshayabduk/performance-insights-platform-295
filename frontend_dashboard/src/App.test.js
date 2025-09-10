import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login screen title', async () => {
  render(<App />);
  const title = await screen.findByText(/Sign in to your account/i);
  expect(title).toBeInTheDocument();
});
