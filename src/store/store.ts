// // src/store/store.ts
// // src/store/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import gameReducer from './slices/gameSlice';
// import localStorageMiddleware from './middleware/localStorage';
// import type { Middleware } from '@reduxjs/toolkit';
// import type { GameState } from './slices/gameSlice';

// // This function is the gatekeeper. It runs before React and solves the bug.
// const loadState = (): GameState | undefined => {
//   try {
//     const gameName = window.location.pathname.substring(1).trim();

//     // FOR ANTONIO (NEW USER): No game name in URL. Return undefined.
//     // His Redux store will use the default initialState from the slice ({ phase: 'SPLASH' }).
//     if (!gameName) {
//       return undefined;
//     }

//     // FOR LUISA (JOINING USER): There IS a game name in the URL.
//     const serializedGameState = localStorage.getItem(gameName);
//     if (!serializedGameState) {
//       return undefined; // Link to a game that doesn't exist.
//     }

//     const persistedGameState = JSON.parse(serializedGameState) as GameState;

//     // FOR A RETURNING USER (e.g., Antonio refreshing):
//     const currentUserId = sessionStorage.getItem('currentUserId');
//     if (currentUserId) {
//       const user = persistedGameState.players.find(p => p.id === currentUserId);
//       if (user) {
//         // Keep them in the game room.
//         return { ...persistedGameState, currentUser: user, phase: 'GAME_ROOM' };
//       }
//     }

//     // **THE GUARANTEED FIX FOR LUISA**
//     // This is a new user joining an existing game. We load the shared game data
//     // BUT WE FORCE THE PHASE TO BE 'JOIN_GAME'.
//     // Her app will NEVER start in the 'SPLASH' phase. The bug is impossible.
//     return {
//       ...persistedGameState,
//       currentUser: null,
//       phase: 'JOIN_GAME',
//     };
//   } catch (err) {
//     console.error('Could not load state from localStorage', err);
//     return undefined;
//   }
// };

// const preloadedState = loadState();

// export const store = configureStore({
//   reducer: {
//     game: gameReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(localStorageMiddleware as Middleware),
  
//   preloadedState: preloadedState ? { game: preloadedState } : undefined,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// src/store/store.ts
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import localStorageMiddleware from './middleware/localStorage';
import type { Middleware } from '@reduxjs/toolkit';
import type { GameState } from './slices/gameSlice';

const loadState = (): GameState | undefined => {
  try {
    const gameName = window.location.pathname.substring(1).trim();
    if (!gameName) return undefined;

    const serializedGameState = localStorage.getItem(gameName);
    if (!serializedGameState) return undefined;

    const gameState = JSON.parse(serializedGameState) as GameState;

    // IMPORTANT: We find our own identity based on sessionStorage,
    // but we let HomePage decide which phase is correct.
    const currentUserId = sessionStorage.getItem('currentUserId');
    if (currentUserId) {
      const user = gameState.players.find(p => p.id === currentUserId);
      gameState.currentUser = user || null;
    } else {
      gameState.currentUser = null;
    }
    
    return gameState;

  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: { 
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware as Middleware),
  
  preloadedState: preloadedState ? { game: preloadedState } : undefined,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;