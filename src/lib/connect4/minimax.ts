import type { Connect4Board } from './connect4';
import { drop, getAvailableColumns } from './connect4';

function evaluateBoard(board: Connect4Board): number {
	return 0;
}

// export function minimax(board: Connect4Board, depth: number, alpha: number, beta: number): number {}
type Player = 'max' | 'min';

interface State {
	// ... your state representation here
}

function minimax(state: State, depth: number, player: Player, alpha: number, beta: number): number {
	if (isTerminalState(state)) {
		return evaluateTerminalState(state);
	}

	if (depth === 0) {
		return evaluateState(state);
	}

	let bestScore: number;
	if (player === 'max') {
		bestScore = Number.NEGATIVE_INFINITY;
		for (const move of listMoves(state)) {
			const nextState = simulateNextState(state, move);
			const score = minimax(nextState, depth - 1, 'min', alpha, beta);
			bestScore = Math.max(bestScore, score);
			alpha = Math.max(alpha, bestScore);
			if (beta <= alpha) {
				break; // Prune branch
			}
		}
	} else {
		bestScore = Number.POSITIVE_INFINITY;
		for (const move of listMoves(state)) {
			const nextState = simulateNextState(state, move);
			const score = minimax(nextState, depth - 1, 'max', alpha, beta);
			bestScore = Math.min(bestScore, score);
			beta = Math.min(beta, bestScore);
			if (beta <= alpha) {
				break; // Prune branch
			}
		}
	}

	return bestScore;
}

function findBestMove(initialState: State, depth: number): string | number {
	let bestMove: string | number = 0;
	let bestScore = Number.NEGATIVE_INFINITY;
	for (const move of listMoves(initialState)) {
		const nextState = simulateNextState(initialState, move);
		const score = minimax(
			nextState,
			depth - 1,
			'min',
			Number.NEGATIVE_INFINITY,
			Number.POSITIVE_INFINITY
		);
		if (score > bestScore) {
			bestScore = score;
			bestMove = move;
		}
	}

	return bestMove;
}

// Replace these with your actual functions
function isTerminalState(state: State): boolean {
	// ... your logic to check if state is terminal
	return false;
}

function evaluateTerminalState(state: State): number {
	// ... your logic to evaluate terminal state score
	return 0;
}

function evaluateState(state: State): number {
	// ... your logic to evaluate non-terminal state score
	return 0;
}

function listMoves(state: State): string[] | number[] {
	// ... your logic to generate list of possible moves
	return [];
}

function simulateNextState(state: State, move: string | number): State {
	// ... your logic to simulate next state based on move
	return state;
}

// Example usage
const initialState: State = {
	/* ... */
};
const depth = 3;
const bestMove = findBestMove(initialState, depth);
console.log('Best move:', bestMove);
