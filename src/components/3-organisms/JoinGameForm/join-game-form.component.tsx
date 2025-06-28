// src/components/3-organisms/JoinGameForm/join-game-form.component.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { joinGame } from '../../../store/slices/gameSlice';
import Button from '../../1-atoms/Button/button.component';
import Card from '../../1-atoms/Card/card.component';
import InputField from '../../2-molecules/InputField/input-field.component';
import RoleSelector from '../../2-molecules/RoleSelector/role-selector.component';
import './join-game-form.component.scss';

const JoinGameForm: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'player' | 'spectator'>('player');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(joinGame({ name: name.trim(), role }));
    }
  };

  return (
    <div className="join-game-overlay">
      <Card>
        <form className="join-game-form" onSubmit={handleSubmit}>
          <InputField
            label="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <RoleSelector selectedValue={role} onChange={setRole} />
          <Button type="submit" disabled={!name.trim()}>
            Continuar
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default JoinGameForm;