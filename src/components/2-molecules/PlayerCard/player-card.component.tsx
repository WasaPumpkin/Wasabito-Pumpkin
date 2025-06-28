// // src/components/2-molecules/PlayerCard/player-card.component.tsx
// src/components/2-molecules/PlayerCard/player-card.component.tsx
import React from 'react';
import type { Player } from '../../../store/slices/gameSlice';
import { useAppSelector } from '../../../hooks/redux-hooks';
import './player-card.component.scss';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const hostId = useAppSelector((state) => state.game.hostId);
  const isThisPlayerTheHost = player.id === hostId;


  const hasVoted = !!player.vote;

  // We build the class name based on this robust check.
  const cardContainerClassName = `player-card-container ${
    hasVoted ? 'player-card-container--voted' : ''
    }`;
    console.log('PlayerCard rendered:', {
      id: player.id,
      name: player.name,
      vote: player.vote,
      hasVoted,
    });

  return (
    <div className={cardContainerClassName}>
      <div className="player-card"></div>
      <span className="player-card-name">
        {player.name}
        {isThisPlayerTheHost && <span className="player-card-crown">👑</span>}
      </span>
    </div>
  );
};

export default PlayerCard;