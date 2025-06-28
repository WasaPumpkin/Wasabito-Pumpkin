// src/components/4-templates/GameRoom/game-room.component.tsx
// src/components/4-templates/GameRoom/game-room.component.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { playerVote, revealVotes } from '../../../store/slices/gameSlice';

import EmptySeat from '../../1-atoms/EmptySeat/empty-seat.component';
import PokerCard from '../../1-atoms/PokerCard/poker-card.component';
import GameHeader from '../../3-organisms/GameHeader/game-header.component';
import PlayerSeat from '../../2-molecules/PlayerSeat/player-seat.component';
import PlayerCard from '../../2-molecules/PlayerCard/player-card.component'; // Make sure this is imported
import Button from '../../1-atoms/Button/button.component';

import './game-room.component.scss';

const cardValues = [ '0', '1', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕️' ];

const GameRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const { players, currentUser, hostId } = useAppSelector((state) => state.game);
  const canVote = currentUser?.role === 'player';

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleVote = (value: string) => {
    if (!currentUser) return;
    setSelectedCard(value);
    // This dispatch updates the global state, triggering a re-render
    dispatch(playerVote({ playerId: currentUser.id, voteValue: value }));
  };

  const isHost = currentUser?.id === hostId;
  const hasVotes = players.some(p => p.vote);
  const showRevealButton = isHost && hasVotes;

  // The seat assignment logic is correct. When the state updates, this will re-run.
  const totalSeats = 8;
  const currentUserSeat = 7;
  const availableSeatNumbers = [1, 2, 3, 4, 5, 6, 8];
  
  const otherPlayers = players.filter(p => currentUser && p.id !== currentUser.id);
  const seatAssignments: { [key: number]: React.ReactNode } = {};

  if (currentUser) {
    seatAssignments[currentUserSeat] = (
      <div key={currentUser.id} className={`seat-position seat-${currentUserSeat}`}>
        <PlayerSeat player={currentUser} />
      </div>
    );
  }

  otherPlayers.forEach((player, index) => {
    const seatNumber = availableSeatNumbers[index];
    if (seatNumber) {
      seatAssignments[seatNumber] = (
        <div key={player.id} className={`seat-position seat-${seatNumber}`}>
          {/* This component will now receive the updated 'player' prop with the .vote property */}
          <PlayerCard player={player} />
        </div>
      );
    }
  });

  for (let i = 1; i <= totalSeats; i++) {
    if (!seatAssignments[i]) {
      seatAssignments[i] = (
        <div key={`empty-${i}`} className={`seat-position seat-${i}`}>
          <EmptySeat />
        </div>
      );
    }
  }

  return (
    <div className="game-room">
      <div className="poker-table-bg">
        {showRevealButton && (
          <div className="reveal-button-container">
            <Button onClick={() => dispatch(revealVotes())}>Revelar Votos</Button>
          </div>
        )}
      </div>
      <GameHeader />
      <div className="seats-container">{Object.values(seatAssignments)}</div>
      {canVote && (
        <main className="game-table">
          <div className="player-area">
            <div className="card-selection-prompt"><span>Elige una carta 👇</span></div>
            <div className="player-hand">
              {cardValues.map((value) => (
                <PokerCard 
                  key={value} 
                  value={value} 
                  isSelected={selectedCard === value}
                  onClick={handleVote}
                />
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default GameRoom;