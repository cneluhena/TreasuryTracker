// SignupForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from '../page'; // Adjust the path according to your file structure

describe('SignupForm', () => {
  it('renders the username and password fields', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('displays error message on invalid login', async () => {
    // Create a mock response that satisfies the Response type
    const mockResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    // Mock the global fetch function to return the mock response
    global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as jest.Mock;

    render(<SignupForm />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByText(/login/i));

    // Check if the error message is displayed
    expect(await screen.findByText(/invalid username or password/i)).toBeInTheDocument();
  });

  // Add more tests as needed
});
