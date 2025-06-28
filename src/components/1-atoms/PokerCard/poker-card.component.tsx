// src/components/1-atoms/PokerCard/poker-card.component.tsx
import React from 'react';
import './poker-card.component.scss';

interface PokerCardProps {
  value: string;
}

const PokerCard: React.FC<PokerCardProps> = ({ value }) => {
  const isCoffee = value === '☕';
  return (
    <div className="poker-card">
      <span className={`poker-card__value ${isCoffee ? 'coffee' : ''}`}>
        {value}
      </span>
    </div>
  );
};

export default PokerCard;