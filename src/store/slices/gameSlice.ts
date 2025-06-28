// src/store/slices/gameSlice.ts
// src/store/slices/gameSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UserRole = 'player' | 'spectator';
type GamePhase = 'SPLASH' | 'CREATE_GAME' | 'JOIN_GAME' | 'GAME_ROOM';

interface User {
  name: string;
  role: UserRole;
}

interface GameState {
  phase: GamePhase;
  gameName: string | null;
  user: User | null;
}

const initialState: GameState = {
  phase: 'SPLASH',
  gameName: null,
  user: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGamePhase: (state, action: PayloadAction<GamePhase>) => {
      state.phase = action.payload;
    },
    createGame: (state, action: PayloadAction<string>) => {
      state.gameName = action.payload;
      state.phase = 'JOIN_GAME';
    },
    joinGame: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.phase = 'GAME_ROOM';
    },
  },
});

export const { setGamePhase, createGame, joinGame } = gameSlice.actions;
export default gameSlice.reducer;