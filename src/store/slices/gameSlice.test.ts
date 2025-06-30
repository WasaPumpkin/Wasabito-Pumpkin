import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  createGame,
  joinGame,
  setGamePhase,
  assignHost,
  playerVote,
  syncState,
  resetGame,
  revealVotes,
  finalizeVotes,
  startNewRound,
  setCardValues,
  type GameState,
} from './gameSlice';

const initialState: GameState = {
  phase: 'SPLASH',
  gameName: null,
  players: [],
  currentUser: null,
  hostId: null,
  isCounting: false,
  votesRevealed: false,
  cardValues: [
    '0',
    '1',
    '3',
    '5',
    '8',
    '13',
    '21',
    '34',
    '55',
    '89',
    '?',
    '☕️',
  ],
};

describe('gameSlice', () => {
  let state: GameState;

  beforeEach(() => {
    state = structuredClone(initialState);
  });

  it('should set game phase', () => {
    const nextState = reducer(state, setGamePhase('CREATE_GAME'));
    expect(nextState.phase).toBe('CREATE_GAME');
  });

  it('should create game and move to JOIN_GAME phase', () => {
    const nextState = reducer(state, createGame('DEVTEAM'));
    expect(nextState.gameName).toBe('DEVTEAM');
    expect(nextState.phase).toBe('JOIN_GAME');
  });

  it('should join game and set current user as host if first', () => {
    const nextState = reducer(
      state,
      joinGame({ name: 'Antonio', role: 'player' })
    );
    expect(nextState.players.length).toBe(1);
    expect(nextState.currentUser?.name).toBe('Antonio');
    expect(nextState.hostId).toBeDefined();
    expect(nextState.phase).toBe('GAME_ROOM');
  });

  it('should assign host', () => {
    const joinedState = reducer(
      state,
      joinGame({ name: 'Maria', role: 'player' })
    );
    const playerId = joinedState.players[0].id;
    const nextState = reducer(joinedState, assignHost(playerId));
    expect(nextState.hostId).toBe(playerId);
  });

  it('should update player vote', () => {
    let nextState = reducer(state, joinGame({ name: 'Luis', role: 'player' }));
    const playerId = nextState.players[0].id;
    nextState = reducer(nextState, playerVote({ playerId, voteValue: '5' }));
    expect(nextState.players[0].vote).toBe('5');
    expect(nextState.currentUser?.vote).toBe('5');
  });

  it('should sync state while preserving currentUser', () => {
    const joinedState = reducer(
      state,
      joinGame({ name: 'Carla', role: 'spectator' })
    );
    const syncedState = reducer(
      joinedState,
      syncState({
        ...initialState,
        players: [{ id: 'xxx', name: 'Other', role: 'player' }],
        phase: 'GAME_ROOM',
        gameName: 'NEWGAME',
        currentUser: null,
        hostId: 'xxx',
        isCounting: false,
        votesRevealed: false,
        cardValues: [],
      })
    );
    expect(syncedState.currentUser).toBeNull();
    expect(syncedState.gameName).toBe('NEWGAME');
  });

  it('should reset game', () => {
    let nextState = reducer(state, createGame('Any'));
    nextState = reducer(nextState, resetGame());
    expect(nextState).toEqual(initialState);
  });

  it('should reveal and finalize votes', () => {
    let nextState = reducer(state, revealVotes());
    expect(nextState.isCounting).toBe(true);
    expect(nextState.votesRevealed).toBe(false);

    nextState = reducer(nextState, finalizeVotes());
    expect(nextState.isCounting).toBe(false);
    expect(nextState.votesRevealed).toBe(true);
  });

  it('should start a new round by clearing votes', () => {
    let nextState = reducer(state, joinGame({ name: 'Test', role: 'player' }));
    const playerId = nextState.players[0].id;
    nextState = reducer(nextState, playerVote({ playerId, voteValue: '13' }));

    nextState = reducer(nextState, startNewRound());
    expect(nextState.players[0].vote).toBeNull();
    expect(nextState.currentUser?.vote).toBeNull();
    expect(nextState.isCounting).toBe(false);
    expect(nextState.votesRevealed).toBe(false);
  });

  it('should set custom card values', () => {
    const newCards = ['1', '2', '3'];
    const nextState = reducer(state, setCardValues(newCards));
    expect(nextState.cardValues).toEqual(newCards);
  });
});
