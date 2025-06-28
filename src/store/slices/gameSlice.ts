// // src/store/slices/gameSlice.ts
// // src/store/slices/gameSlice.ts
// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// type GamePhase = 'SPLASH' | 'CREATE_GAME' | 'JOIN_GAME' | 'GAME_ROOM';

// export interface Player {
//   id: string;
//   name: string;
//   role: 'player' | 'spectator';
//   vote?: string;
// }

// export interface GameState {
//   phase: GamePhase;
//   gameName: string | null;
//   players: Player[];
//   currentUser: Player | null;
//   hostId: string | null;
// }

// const initialState: GameState = {
//   phase: 'SPLASH',
//   gameName: null, players: [], currentUser: null, hostId: null,
// };

// const gameSlice = createSlice({
//   name: 'game',
//   initialState,
//   reducers: {
//     setGamePhase: (state, action: PayloadAction<GamePhase>) => {
//       state.phase = action.payload;
//     },
//     createGame: (state, action: PayloadAction<string>) => {
//       state.gameName = action.payload;
//       state.phase = 'JOIN_GAME';
//     },
//     joinGame: (
//       state,
//       action: PayloadAction<{ name: string; role: 'player' | 'spectator' }>
//     ) => {
//       const { name, role } = action.payload;
//       const newPlayer: Player = { id: new Date().toISOString() + name, name, role };
//       if (state.players.length === 0) {
//         state.hostId = newPlayer.id;
//       }
//       state.players.push(newPlayer);
//       state.currentUser = newPlayer;
//       state.phase = 'GAME_ROOM';
//     },
//     assignHost: (state, action: PayloadAction<string>) => {
//       if (state.players.some((p) => p.id === action.payload)) {
//         state.hostId = action.payload;
//       }
//     },
//     playerVote: (
//       state,
//       action: PayloadAction<{ playerId: string; voteValue: string }>
//     ) => {
//       const { playerId, voteValue } = action.payload;
//       const playerIndex = state.players.findIndex((p) => p.id === playerId);
//       if (playerIndex !== -1) {
//         state.players[playerIndex].vote = voteValue;
//       }
//     },
//     // --- FIX IS HERE ---
//     // Since we don't use the state at all, we can remove it from the function signature.
//     revealVotes: () => {
//       console.log('Votes revealed!');
//     },
//     resetVotes: (state) => {
//       state.players.forEach((player) => {
//         delete player.vote;
//       });
//     },
//     syncState: (state, action: PayloadAction<GameState>) => {
//       return {
//         ...action.payload,
//         currentUser: state.currentUser,
//       };
//     },
//     resetGame: () => {
//       return initialState;
//     },
//   },
// });

// export const {
//   setGamePhase,
//   createGame,
//   joinGame,
//   assignHost,
//   playerVote,
//   revealVotes,
//   resetVotes,
//   syncState,
//   resetGame,
// } = gameSlice.actions;

// export default gameSlice.reducer;





// src/store/slices/gameSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type GamePhase = 'SPLASH' | 'CREATE_GAME' | 'JOIN_GAME' | 'GAME_ROOM';
export interface Player { id: string; name: string; role: 'player' | 'spectator'; vote?: string; }
export interface GameState {
  phase: GamePhase;
  gameName: string | null;
  players: Player[];
  currentUser: Player | null;
  hostId: string | null;
}

const initialState: GameState = {
  phase: 'SPLASH',
  gameName: null, players: [], currentUser: null, hostId: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGamePhase: (state, action: PayloadAction<GamePhase>) => { state.phase = action.payload; },
    createGame: (state, action: PayloadAction<string>) => {
      state.gameName = action.payload;
      state.phase = 'JOIN_GAME';
    },
    joinGame: (state, action: PayloadAction<{ name: string; role: 'player' | 'spectator' }>) => {
      const { name, role } = action.payload;
      const newPlayer: Player = { id: new Date().toISOString() + name, name, role };
      if (state.players.length === 0) { state.hostId = newPlayer.id; }
      state.players.push(newPlayer);
      state.currentUser = newPlayer;
      state.phase = 'GAME_ROOM';
    },
    
    // --- THIS REDUCER IS NOW SMARTER ---
    playerVote: (state, action: PayloadAction<{ playerId: string; voteValue: string }>) => {
      const { playerId, voteValue } = action.payload;
      const playerInArray = state.players.find(p => p.id === playerId);
      // It updates the player in the main array
      if (playerInArray) {
        playerInArray.vote = voteValue;
      }
      // AND it updates the currentUser object if they are the one who voted
      if (state.currentUser && state.currentUser.id === playerId) {
        state.currentUser.vote = voteValue;
      }
    },
    
    assignHost: (state, action: PayloadAction<string>) => {
      if (state.players.some(p => p.id === action.payload)) { state.hostId = action.payload; }
    },
    
    // --- THIS REDUCER IS THE FINAL FIX ---
    syncState: (state, action: PayloadAction<GameState>) => {
      const newState = action.payload;
      // Find our own user's updated data from the incoming list of players.
      const self = state.currentUser ? newState.players.find(p => p.id === state.currentUser!.id) : null;
      
      // Return the new state, but ensure our currentUser is the fresh, updated version of ourself.
      // This guarantees that if our user object was updated by another player's action, we get that update.
      return {
        ...newState,
        currentUser: self || null,
      };
    },
    
    resetVotes: (state) => {
      state.players.forEach((player) => { delete player.vote; });
      // Also reset the currentUser's vote
      if (state.currentUser) { delete state.currentUser.vote; }
    },
    revealVotes: () => { console.log('Votes revealed!'); },
    resetGame: () => { return initialState; }
  },
});

export const { setGamePhase, createGame, joinGame, assignHost, playerVote, revealVotes, resetVotes, syncState, resetGame } = gameSlice.actions;
export default gameSlice.reducer;