// src/store/middleware/localStorage.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import localStorageMiddleware from './localStorage';
import { configureStore } from '@reduxjs/toolkit';
import gameReducer, {
  createGame,
  joinGame,
  assignHost,
  resetGame,
  playerVote,
} from '../slices/gameSlice';
import type { RootState } from '../store';

// Mock localStorage and sessionStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

beforeEach(() => {
  // Setup mock storage
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    configurable: true,
  });
  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
    configurable: true,
  });
});

afterEach(() => {
  // Clear all mocks after each test
  vi.clearAllMocks();
  localStorageMock.clear();
});

describe('localStorageMiddleware', () => {
  const setupStore = () => {
    const store = configureStore({
      reducer: {
        game: gameReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    });
    return store;
  };

  it('should save to localStorage for createGame action', () => {
    const store = setupStore();
    const gameName = 'test-game';

    store.dispatch(createGame(gameName));

    const state = store.getState() as RootState;
    const expectedState = JSON.stringify(state.game);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      gameName,
      expectedState
    );
  });

  it('should save to localStorage for joinGame action', () => {
    const store = setupStore();
    const playerInfo = { name: 'Test Player', role: 'player' as const };

    store.dispatch(joinGame(playerInfo));

    const state = store.getState() as RootState;
    const expectedState = JSON.stringify(state.game);

    if (state.game.gameName) {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        state.game.gameName,
        expectedState
      );
    }

    // Should also save user ID to sessionStorage
    if (state.game.currentUser) {
      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        'currentUserId',
        state.game.currentUser.id
      );
    }
  });

  it('should save to localStorage for assignHost action', () => {
    const store = setupStore();
    const hostId = 'new-host-id';

    // First create a game to have a gameName
    store.dispatch(createGame('test-game'));
    store.dispatch(assignHost(hostId));

    const state = store.getState() as RootState;
    const expectedState = JSON.stringify(state.game);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-game',
      expectedState
    );
  });

  it('should save to localStorage for playerVote action', () => {
    const store = setupStore();
    const voteInfo = { playerId: 'player-1', voteValue: '5' };

    // First create a game and join as player
    store.dispatch(createGame('test-game'));
    store.dispatch(joinGame({ name: 'Test Player', role: 'player' }));
    store.dispatch(playerVote(voteInfo));

    const state = store.getState() as RootState;
    const expectedState = JSON.stringify(state.game);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'test-game',
      expectedState
    );
  });

  it('should clear sessionStorage for resetGame action', () => {
    const store = setupStore();

    // First create a game and join as player
    store.dispatch(createGame('test-game'));
    store.dispatch(joinGame({ name: 'Test Player', role: 'player' }));
    store.dispatch(resetGame());

    expect(sessionStorageMock.removeItem).toHaveBeenCalledWith('currentUserId');
  });

  it('should not save to localStorage for non-persisted actions', () => {
    const store = setupStore();
    const nonPersistedAction = { type: 'game/nonPersistedAction' };

    store.dispatch(nonPersistedAction);

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('should handle localStorage errors gracefully', () => {
    const store = setupStore();
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    // Force localStorage.setItem to throw an error
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('Storage quota exceeded');
    });

    store.dispatch(createGame('test-game'));

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Could not save state to localStorage',
      expect.any(Error)
    );

    consoleWarnSpy.mockRestore();
  });

  it('should not save to localStorage if gameName is not set', () => {
    const store = setupStore();

    // Dispatch joinGame without first creating a game
    store.dispatch(joinGame({ name: 'Test Player', role: 'player' }));

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
});
