// src/components/5-pages/HomePage/home-page.component.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { setGamePhase } from '../../../store/slices/gameSlice';
import Logo from '../../1-atoms/Logo/logo.component';
import CreateGameForm from '../../3-organisms/CreateGameForm/create-game-form.component';
import JoinGameForm from '../../3-organisms/JoinGameForm/join-game-form.component';
import GameRoom from '../../4-templates/GameRoom/game-room.component';
import './home-page.component.scss';

// Let's rename the prop for clarity
const SplashScreen: React.FC<{ isFadingOut: boolean }> = ({ isFadingOut }) => (
  <div className={`splash-screen ${isFadingOut ? 'fade-out' : ''}`}>
    <Logo text="pragma" />
  </div>
);

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const gamePhase = useAppSelector((state) => state.game.phase);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (gamePhase === 'SPLASH') {
      // --- THE FIX IS HERE ---
      // This timer is the TOTAL time the screen is visible before the fade-out begins.
      // 1000ms = 0.4s fade-in animation + 0.6s hold time.
      const displayTimer = setTimeout(() => {
        setIsFadingOut(true); // Trigger the fade-out animation

        // This timer waits for the fade-out to finish before changing the phase.
        // It MUST match the CSS transition duration.
        const phaseChangeTimer = setTimeout(() => {
          dispatch(setGamePhase('CREATE_GAME'));
        }, 400); // Matches the 0.4s transition in the SCSS

        return () => clearTimeout(phaseChangeTimer);
      }, 1000); // Drastically reduced from 1500ms

      return () => clearTimeout(displayTimer);
      // --- END OF FIX ---
    }
  }, [gamePhase, dispatch]);

  const renderPhase = () => {
    switch (gamePhase) {
      case 'SPLASH':
        return <SplashScreen isFadingOut={isFadingOut} />;
      case 'CREATE_GAME':
        return <CreateGameForm />;
      case 'JOIN_GAME':
        return (
          <div className="game-container--blurred">
            <GameRoom />
            <JoinGameForm />
          </div>
        );
      case 'GAME_ROOM':
        return <GameRoom />;
      default:
        return <SplashScreen isFadingOut={isFadingOut} />;
    }
  };

  return <div className="home-page">{renderPhase()}</div>;
};

export default HomePage;