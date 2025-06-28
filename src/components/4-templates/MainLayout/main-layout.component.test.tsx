// src/components/4-templates/MainLayout/main-layout.component.test.tsx
import { render, screen } from '@testing-library/react';
import { MainLayout } from './main-layout.component';

describe('MainLayout Template', () => {
  it('renders the header, footer, and children content', () => {
    render(
      <MainLayout>
        <div>Main Content Here</div>
      </MainLayout>
    );
    expect(screen.getByText('Atomic App')).toBeInTheDocument(); // From Header
    expect(screen.getByText('Main Content Here')).toBeInTheDocument();
    expect(screen.getByText(/Atomic Design App/)).toBeInTheDocument(); // From Footer
  });
});