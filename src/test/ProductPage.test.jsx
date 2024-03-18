import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Add this import
import ProductPage from '../components/ProductPage';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, category: "men's clothing" },
      { id: 2, category: "women's clothing" },
      { id: 3, category: "electronics" }
    ])
  })
);

const setProduct = jest.fn();
const getRelatedProducts = jest.fn();

const { getProduct } = require('../components/ProductPage');

describe('ProductPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products and set a random product', async () => {
    await getProduct();

    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    expect(setProduct).toHaveBeenCalled();
  });

  it('should call getRelatedProducts with the correct category', async () => {
    await getProduct();

    expect(getRelatedProducts).toHaveBeenCalledWith(expect.any(String));
  });

  it('should handle errors', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('Fetch error'));

    await getProduct();

    expect(console.error).toHaveBeenCalledWith('Fetch error');
  });
});
