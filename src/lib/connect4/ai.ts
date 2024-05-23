import type { Connect4Board, Connect4Player } from './connect4';
import { connects4, getAvailableColumns, drop } from './connect4';

function scorePosition(board: Connect4Board, player: Connect4Player) {
	// Evaluate the board and return a score
	// Implement scoring logic based on the current state of the board
	return 0;
}

function minimax(
	board: Connect4Board,
	depth = 5,
	alpha = Infinity,
	beta = -Infinity,
	maximizingPlayer = true
) {
	let validLocations = getAvailableColumns(board);
	let isTerminal = connects4(board, 0) || connects4(board, 1) || validLocations.length === 0;
	if (depth === 0 || isTerminal) {
		if (isTerminal) {
			if (connects4(board, 0)) {
				return { score: 100000000000000 };
			} else if (connects4(board, 1)) {
				return { score: -10000000000000 };
			} else {
				return { score: 0 }; // Game is over, no more valid moves.
			}
		} else {
			// Depth is zero
			return { score: scorePosition(board, 0) };
		}
	}

	if (maximizingPlayer) {
		let value = -Infinity;
		let bestColumn = validLocations[0];
		for (let col of validLocations) {
			let bCopy = board.map((row) => row.slice());
			bCopy = drop(bCopy, col, 0);
			let newScore = minimax(bCopy, depth - 1, alpha, beta, false).score;
			if (newScore > value) {
				value = newScore;
				bestColumn = col;
			}

			alpha = Math.max(alpha, value);
			if (alpha >= beta) {
				break;
			}
		}
		return { column: bestColumn, score: value };
	} else {
		let value = Infinity;
		let bestColumn = validLocations[0];
		for (let col of validLocations) {
			let bCopy = board.map((row) => row.slice());
			bCopy = drop(bCopy, col, 1);
			let newScore = minimax(bCopy, depth - 1, alpha, beta, true).score;
			if (newScore < value) {
				value = newScore;
				bestColumn = col;
			}
			beta = Math.min(beta, value);
			if (alpha >= beta) {
				break;
			}
		}
		return { column: bestColumn, score: value };
	}
}
