// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter, Route, useParams } from 'react-router-dom';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import ProductPage from './ProductPage';
// import productsAPI from '../api/productsAPI';

// // Mocking the productsAPI module
// jest.mock('../api/productsAPI');

// // Mocking the useParams hook
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: jest.fn(),
// }));

// const server = setupServer(
//   // Mocking the getProduct API call
//   rest.get('/api/products/:pid', (req, res, ctx) => {
//     return res(ctx.json({ id: 'mockProductId', name: 'Mock Product' }));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test('renders ProductPage with product details', async () => {
//   // Mocking the useParams value
//   useParams.mockReturnValue({ pid: 'mockProductId' });

//   // Mocking the getProduct function
//   productsAPI.getProduct.mockResolvedValue({ id: 'mockProductId', name: 'Mock Product' });

//   render(
//     <MemoryRouter initialEntries={['/products/mockProductId']}>
//       <Route path="/products/:pid">
//         <ProductPage />
//       </Route>
//     </MemoryRouter>
//   );

//   // Loading spinner should be present initially
//   expect(screen.getByRole('progressbar')).toBeInTheDocument();

//   // Wait for the product details to be loaded
//   await waitFor(() => screen.getByText('Mock Product'));

//   // Product details should be displayed
//   expect(screen.getByText('Mock Product')).toBeInTheDocument();
//   // Additional assertions based on your component content
// });

// test('handles product deletion correctly', async () => {
//   // Mocking the useParams value
//   useParams.mockReturnValue({ pid: 'mockProductId' });

//   // Mocking the getProduct function
//   productsAPI.getProduct.mockResolvedValue({ id: 'mockProductId', name: 'Mock Product' });

//   // Mocking the deleteProduct function
//   productsAPI.deleteProduct.mockResolvedValue();

//   render(
//     <MemoryRouter initialEntries={['/products/mockProductId']}>
//       <Route path="/products/:pid">
//         <ProductPage />
//       </Route>
//     </MemoryRouter>
//   );

//   // Wait for the product details to be loaded
//   await waitFor(() => screen.getByText('Mock Product'));

//   // Click the delete button
//   fireEvent.click(screen.getByText('Delete'));

//   // Wait for deletion and navigation
//   await waitFor(() => expect(productsAPI.deleteProduct).toHaveBeenCalledWith('mockProductId'));
//   expect(screen.getByText('Product Details')).toBeInTheDocument(); // or any other assertion based on your expected behavior
// });
