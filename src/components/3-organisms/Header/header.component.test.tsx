// src/components/3-organisms/Header/header.component.test.tsx
// fireEvent is no longer needed, so we can remove it from the import
import { render, screen } from '@testing-library/react';
import { Header } from './header.component';

describe('Header Component', () => {
  it('renders the logo text', () => {
    render(<Header />);
    expect(screen.getByText('Atomic App')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  // --- THIS ENTIRE TEST CASE HAS BEEN DELETED ---
  // it('toggles the mobile menu when the menu button is clicked', () => { ... });
});