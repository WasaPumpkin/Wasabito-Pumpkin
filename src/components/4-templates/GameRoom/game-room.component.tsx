// src/components/4-templates/GameRoom/game-room.component.tsx
import React from 'react';
// --- FIX 1: Import the new EmptySeat component ---
import EmptySeat from '../../1-atoms/EmptySeat/empty-seat.component';
import PokerCard from '../../1-atoms/PokerCard/poker-card.component';
import GameHeader from '../../3-organisms/GameHeader/game-header.component';
import './game-room.component.scss';

const cardValues = [
  '0',
  '½',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '20',
  '40',
  '100',
  '☕',
];

const GameRoom: React.FC = () => {
  return (
    <div className="game-room">
      <div className="poker-table-bg" />
      <GameHeader />

      {/* --- FIX 2: Add the seats container and render the 8 seats --- */}
      <div className="seats-container">
        {[...Array(8)].map((_, index) => (
          <div key={index} className={`seat-position seat-${index + 1}`}>
            <EmptySeat />
          </div>
        ))}
      </div>
      {/* --- END OF FIX 2 --- */}

      <main className="game-table">
        <div className="player-area">
          <div className="card-selection-prompt">
            <span>Elige una carta 👇</span>
          </div>
          <div className="player-hand">
            {cardValues.map((value) => (
              <PokerCard key={value} value={value} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameRoom;