// src/components/3-organisms/CreateGameForm/create-game-form.component.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { createGame } from '../../../store/slices/gameSlice';
import Button from '../../1-atoms/Button/button.component';
import InputField from '../../2-molecules/InputField/input-field.component';
import './create-game-form.component.scss';
import Logo from '../../1-atoms/Logo/logo.component';

const CreateGameForm: React.FC = () => {
  const [gameName, setGameName] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameName.trim()) {
      dispatch(createGame(gameName.trim()));
    }
  };

  return (
    <div className="create-game-container">
      <header className="create-game-header">
        <Logo size="small" text="Crear partida" />
      </header>
      <main className="create-game-main">
        <form className="create-game-form" onSubmit={handleSubmit}>
          <InputField
            label="Nombra la partida"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
            autoFocus
          />
          <Button type="submit" disabled={!gameName.trim()}>
            Crear partida
          </Button>
        </form>
      </main>
    </div>
  );
};

export default CreateGameForm;