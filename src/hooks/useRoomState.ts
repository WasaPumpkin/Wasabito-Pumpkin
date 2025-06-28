// // src/hooks/useRoomState.ts
// src/hooks/useRoomState.ts
import { useState, useEffect, useCallback } from 'react';

// --- 1. DEFINE THE SHAPES (adapted from our Redux slice) ---

type GamePhase = 'SPLASH' | 'CREATE_GAME' | 'JOIN_GAME' | 'GAME_ROOM';

export interface Player {
  id: string;
  name: string;
  role: 'player' | 'spectator';
  // vote?: CardValue; // You can add this back later
}

// This is the complete shape of our application's shared state
export interface RoomState {
  phase: GamePhase;
  gameName: string | null;
  players: Player[];
  currentUser: Player | null;
  hostId: string | null;
}

// This is the hook itself. The internal logic is mostly from your example.
export function useRoomState(
  roomId: string | null
): [RoomState | null, (newState: RoomState) => void] {
  
  // This function reads from localStorage to get the initial state
  const getInitialState = useCallback((): RoomState | null => {
    if (!roomId) return null;
    try {
      const storedState = localStorage.getItem(roomId);
      // If there's stored state, parse it. Otherwise, return null.
      return storedState ? JSON.parse(storedState) : null;
    } catch (error) {
      console.error('Failed to parse state from localStorage', error);
      return null;
    }
  }, [roomId]);

  const [roomState, setRoomState] = useState<RoomState | null>(getInitialState);

  // This function updates the React state, localStorage, and notifies other tabs
  const updateState = useCallback(
    (newState: RoomState) => {
      if (!roomId) return;
      setRoomState(newState);
      try {
        localStorage.setItem(roomId, JSON.stringify(newState));
        // Manually dispatch a storage event so this tab and others react instantly
        window.dispatchEvent(new StorageEvent('storage', { key: roomId }));
      } catch (error) {
        console.error('Failed to save state to localStorage', error);
      }
    },
    [roomId]
  );

  // This effect listens for changes made by other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // If the change was for our room, update the state
      if (event.key === roomId) {
        setRoomState(getInitialState());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [roomId, getInitialState]);

  return [roomState, updateState];
}