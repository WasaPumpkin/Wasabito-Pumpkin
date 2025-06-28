// src/components/4-templates/MainLayout/main-layout.component.tsx
import React from 'react';
import { Header } from '../../3-organisms/Header/header.component';
import './main-layout.component.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout__content">{children}</main>
      <footer className="main-layout__footer">
        <p>© 2023 Atomic Design App</p>
      </footer>
    </div>
  );
};