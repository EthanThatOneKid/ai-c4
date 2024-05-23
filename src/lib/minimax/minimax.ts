export function findBestMove<TState, TMove>(
	minimaxxer: Minimaxxer<TState, TMove>,
	initialState: TState,
	depth: number
): TMove {
	let bestMove: TMove | undefined = undefined;
	let bestScore = Number.NEGATIVE_INFINITY;
	for (const move of minimaxxer.listMoves(initialState)) {
		const nextState = minimaxxer.simulateNextState(initialState, move);
		const score = minimax(
			minimaxxer,
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

	return bestMove as TMove;
}

export function minimax<TState, TMove>(
	minimaxxer: Minimaxxer<TState, TMove>,
	state: TState,
	depth: number,
	player: MinimaxPlayer,
	alpha: number,
	beta: number
): number {
	if (minimaxxer.isTerminalState(state)) {
		return minimaxxer.evaluateTerminalState(state);
	}

	if (depth === 0) {
		return minimaxxer.evaluateState(state);
	}

	let bestScore: number;
	if (player === 'max') {
		bestScore = Number.NEGATIVE_INFINITY;
		for (const move of minimaxxer.listMoves(state)) {
			const nextState = minimaxxer.simulateNextState(state, move);
			const score = minimax(minimaxxer, nextState, depth - 1, 'min', alpha, beta);
			bestScore = Math.max(bestScore, score);
			alpha = Math.max(alpha, bestScore);
			if (beta <= alpha) {
				break; // Prune branch
			}
		}
	} else {
		bestScore = Number.POSITIVE_INFINITY;
		for (const move of minimaxxer.listMoves(state)) {
			const nextState = minimaxxer.simulateNextState(state, move);
			const score = minimax(minimaxxer, nextState, depth - 1, 'max', alpha, beta);
			bestScore = Math.min(bestScore, score);
			beta = Math.min(beta, bestScore);
			if (beta <= alpha) {
				break; // Prune branch
			}
		}
	}

	return bestScore;
}

export interface Minimaxxer<TState, TMove> {
	isTerminalState(state: TState): boolean;
	evaluateTerminalState(state: TState): number;
	evaluateState(state: TState): number;
	listMoves(state: TState): TMove[];
	simulateNextState(state: TState, move: TMove): TState;
}

export type MinimaxPlayer = 'max' | 'min';
