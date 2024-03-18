import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CheckoutSummary from '../components/CheckoutSummary';

describe('CheckoutSummary component', () => {
  const product = {
    title: 'Test Product',
    price: '50',
    image: 'test-image-url',
  };

  const paymentData = {
    email: 'test@example.com',
    nameCard: 'Test User',
    cardNumber: '1234567890123456',
    address: '123 Test St',
    city: 'Test City',
    state: 'Test State',
  };

  it('renders with correct data', () => {
    render(
        <MemoryRouter>
        <CheckoutSummary location={{ state: { product, paymentData } }} />
      </MemoryRouter>
    );

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(paymentData.email)).toBeInTheDocument();
    expect(screen.getByText(paymentData.nameCard)).toBeInTheDocument();
    expect(screen.getByText(paymentData.cardNumber)).toBeInTheDocument();
    expect(screen.getByText(paymentData.address)).toBeInTheDocument();
    expect(screen.getByText(paymentData.city)).toBeInTheDocument();
    expect(screen.getByText(paymentData.state)).toBeInTheDocument();
  });

  /* it('displays loading spinner while processing', () => {
    render(
      <MemoryRouter>
        <CheckoutSummary location={{ state: { product, paymentData } }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('confirm-purchase-button'));

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  }); */

  /* it('shows success message on successful purchase', async () => {
    jest.useFakeTimers();

    render(
      <MemoryRouter>
        <CheckoutSummary location={{ state: { product, paymentData } }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('confirm-purchase-button'));

    await waitFor(() => jest.runAllTimers());

    expect(await screen.findByText('Compra exitosa!')).toBeInTheDocument();
    expect(screen.getByText('Compra exitosa!')).toHaveClass('toast-success');

    jest.useRealTimers();
  }); */

  /* it('shows error message on failed purchase', async () => {
    jest.useFakeTimers();

    render(
      <MemoryRouter>
        <CheckoutSummary location={{ state: { product, paymentData } }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('confirm-purchase-button'));

    jest.advanceTimersByTime(4000);

    expect(await screen.findByText('Error en la compra. Inténtalo de nuevo.')).toBeInTheDocument();
    expect(screen.getByText('Error en la compra. Inténtalo de nuevo.')).toHaveClass('toast-error');

    jest.useRealTimers();
  }); */
});
