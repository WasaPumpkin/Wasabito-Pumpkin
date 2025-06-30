// // src/components/3-organisms/GameHeader/game-header.component.tsx
import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux-hooks';
import Button from '../../1-atoms/Button/button.component';
import InviteModal from '../InviteModal/invite-modal.component';
import HostPrivilegesModal from '../HostPrivilegesModal/host-privileges-modal.component';
import './game-header.component.scss';

const getInitials = (name: string = '') =>
  name.trim().slice(0, 2).toUpperCase();

const GameHeader: React.FC = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);


  const { gameName, currentUser, hostId } = useAppSelector(
    (state) => state.game
  );


  const isCurrentUserTheHost = currentUser?.id === hostId;

  return (
    <>
      <header className="game-header">
        <div className="game-header__logo-placeholder">⚙️</div>
        <div className="game-header__room-name">{gameName}</div>
        <div className="game-header__user-info">
          {currentUser && (
          
            <button
              className="user-avatar-button"
              onClick={() => isCurrentUserTheHost && setIsHostModalOpen(true)}
              disabled={!isCurrentUserTheHost}
            >
              <div className="user-avatar">{getInitials(currentUser.name)}</div>
            </button>
          )}
          <Button variant="outline" onClick={() => setIsInviteModalOpen(true)}>
            Invitar jugadores
          </Button>
        </div>
      </header>

      {isInviteModalOpen && (
        <InviteModal onClose={() => setIsInviteModalOpen(false)} />
      )}

      {isHostModalOpen && (
        <HostPrivilegesModal onClose={() => setIsHostModalOpen(false)} />
      )}
    </>
  );
};

export default GameHeader;