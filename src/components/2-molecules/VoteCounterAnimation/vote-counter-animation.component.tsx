// src/components/2-molecules/VoteCounterAnimation/vote-counter-animation.component.tsx
import React from 'react';
import './vote-counter-animation.component.scss';

/**
 * A purely presentational component that shows an animated
 * "Counting Votes..." indicator. It takes no props.
 */
// The fix is to change React.FC<VoteSummaryProps> back to just React.FC
const VoteCounterAnimation: React.FC = () => {
  return (
    <div className="vote-counter-animation-container">
      <div className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <span className="counting-text">Contando Votos...</span>
    </div>
  );
};

export default VoteCounterAnimation;