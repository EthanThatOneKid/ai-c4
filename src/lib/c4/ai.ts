import type { C4Board, C4Player } from './c4';
import { besidePlayer, connects4, getColumnRow, getPossibleColumns } from './c4';

/**
 * minimax applies the alpha beta pruning algorithm to the Connect 4 game.
 *
 * @see
 * https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/
 */
export function minimax(
	board: C4Board,
	depth: number = 6,
	alpha: number = -Infinity,
	beta: number = Infinity,
	maximizingPlayer: boolean = true
): [number | null, number] {
	const validLocations = getPossibleColumns(board);
	const isTerminal = checkTerminal(board);

	if (depth === 0 || isTerminal) {
		if (isTerminal) {
			if (connects4(board, 1)) {
				return [null, Infinity];
			} else if (connects4(board, 0)) {
				return [null, -Infinity];
			} else {
				return [null, 0];
			}
		} else {
			return [null, scorePosition(board, 1)];
		}
	}

	if (maximizingPlayer) {
		let value = -Infinity;
		let column = validLocations[0];
		for (const col of validLocations) {
			const row = getColumnRow(board, col);
			const bCopy = board.map((row) => row.slice()) as C4Board;
			bCopy[row][col] = 1;
			const newScore = minimax(bCopy, depth - 1, alpha, beta, false)[1];

			if (newScore > value) {
				value = newScore;
				column = col;
			}
			alpha = Math.max(alpha, value);

			if (alpha >= beta) {
				break;
			}
		}

		return [column, value];
	} else {
		let value = Infinity;
		let column = validLocations[0];
		for (const col of validLocations) {
			const row = getColumnRow(board, col);
			const bCopy = board.map((row) => row.slice()) as C4Board;
			bCopy[row][col] = 0;
			const newScore = minimax(bCopy, depth - 1, alpha, beta, true)[1];

			if (newScore < value) {
				value = newScore;
				column = col;
			}
			beta = Math.min(beta, value);

			if (alpha >= beta) {
				break;
			}
		}

		return [column, value];
	}
}

export function checkTerminal(board: C4Board): boolean {
	return getPossibleColumns(board).length === 0 || connects4(board, 0) || connects4(board, 1);
}

export function scorePositionDifference(board: C4Board, player: C4Player): number {
	return scorePosition(board, player) - scorePosition(board, besidePlayer(player));
}

export function scorePosition(board: C4Board, player: C4Player): number {
	let score = 0;
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 7; col++) {
			if (board[row][col] === player) {
				score += EVALUATION_BOARD[row][col];
			}
		}
	}

	return score;
}

export const EVALUATION_BOARD = [
	[3, 4, 5, 7, 5, 4, 3],
	[4, 6, 8, 10, 8, 6, 4],
	[5, 8, 11, 13, 11, 8, 5],
	[5, 8, 11, 13, 11, 8, 5],
	[4, 6, 8, 10, 8, 6, 4],
	[3, 4, 5, 7, 5, 4, 3]
];
