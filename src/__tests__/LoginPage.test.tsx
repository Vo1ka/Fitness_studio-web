import LoginPage from '@/app/(public)/login/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('LoginPage', () => {
  it('renders login form', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeDisabled();
  });

  it('enables submit button when form is valid', async () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/пароль/i);
    const button = screen.getByRole('button', { name: /войти/i });

    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(button).toBeEnabled();
  });
});
