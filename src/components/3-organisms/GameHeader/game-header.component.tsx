// src/components/3-organisms/GameHeader/game-header.component.tsx
import React from 'react';
import Button from '../../1-atoms/Button/button.component';
import Logo from '../../1-atoms/Logo/logo.component';
import './game-header.component.scss';

const GameHeader: React.FC = () => {
  return (
    <header className="game-header">
      <div className="game-header__logo">
        <Logo size="small" />
      </div>
      <Button
        variant="outline"
        onClick={() => navigator.clipboard.writeText(window.location.href)}
      >
        Invitar Jugadoores
      </Button>
    </header>
  );
};

export default GameHeader;