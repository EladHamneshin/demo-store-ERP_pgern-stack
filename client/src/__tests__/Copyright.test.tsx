import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Copyright } from '../components/Copyright';

describe('Copyright', () => {

  it('renders the current year', () => {

    render(<Copyright />);
    

    expect(screen.getByText(/2024/)).toBeInTheDocument();

  });

  it('renders the copyright symbol', () => {

    render(<Copyright />);
    
    expect(screen.getByText(/©/)).toBeInTheDocument();

  });

  it('matches snapshot', () => {

    const { container } = render(<Copyright />);
    
    expect(container).toMatchSnapshot();

  });

});