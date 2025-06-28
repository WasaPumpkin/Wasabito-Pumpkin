// src/components/3-organisms/GameHeader/game-header.component.tsx
// src/components/3-organisms/GameHeader/game-header.component.tsx

import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux-hooks'; 
import Button from '../../1-atoms/Button/button.component'; 
// --- 2. ADDED IMPORT ---
// We need to import the new InviteModal component we created.
import InviteModal from '../InviteModal/invite-modal.component';
import './game-header.component.scss';

const getInitials = (name: string = '') => {
  return name.trim().slice(0, 2).toUpperCase();
};

const GameHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gameName = useAppSelector((state) => state.game.gameName);
  const currentUser = useAppSelector((state) => state.game.currentUser);

  return (
    <>
      <header className="game-header">
        <div className="game-header__logo-placeholder">⚙️</div>
        <div className="game-header__room-name">{gameName}</div>
        <div className="game-header__user-info">
          {currentUser && (
            <div className="user-avatar">{getInitials(currentUser.name)}</div>
          )}      
          <Button variant="outline" onClick={() => setIsModalOpen(true)}>
            Invitar jugadores
          </Button>
        </div>
      </header>
     
      {isModalOpen && <InviteModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default GameHeader;