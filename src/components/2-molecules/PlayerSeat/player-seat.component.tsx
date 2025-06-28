// src/components/2-molecules/PlayerSeat/player-seat.component.tsx
import React from 'react';
import type { Player } from '../../../store/slices/gameSlice';
// Import the redux hook to get data
import { useAppSelector } from '../../../hooks/redux-hooks';
import './player-seat.component.scss';

interface PlayerSeatProps {
  player: Player;
}

const getInitials = (name: string = '') => {
  return name.trim().slice(0, 2).toUpperCase();
};

const PlayerSeat: React.FC<PlayerSeatProps> = ({ player }) => {
  // --- UPDATED LOGIC ---
  // 1. Get the hostId from the global Redux state.
  const hostId = useAppSelector((state) => state.game.hostId);

  // 2. Determine if THIS player is the host by comparing their ID to the hostId.
  const isThisPlayerTheHost = player.id === hostId;

  // 3. The logic for showing the crown now uses this new variable.
  const isVotingHost = isThisPlayerTheHost && player.role === 'player';
  const isSpectatorHost = isThisPlayerTheHost && player.role === 'spectator';

  return (
    <div className="player-seat">
      <div className="player-seat__avatar">{getInitials(player.name)}</div>
      <div className="player-seat__name">
        {player.name}

        {isVotingHost && <span className="player-seat__crown">👑</span>}
        {isSpectatorHost && (
          <span className="player-seat__crown player-seat__crown--spectator">
            👑
          </span>
        )}
      </div>
    </div>
  );
};

export default PlayerSeat;
