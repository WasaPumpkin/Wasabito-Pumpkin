// src/components/5-pages/HomePage/home-page.component.test.tsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { HomePage } from './home-page.component';

describe('HomePage', () => {
  it('renders the welcome heading and the Counter organism', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(
      screen.getByRole('heading', { name: /Welcome/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Redux Counter')).toBeInTheDocument();
  });
});