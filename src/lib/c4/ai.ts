import type { C4Board, C4Player } from './c4';
import { besidePlayer, connects4, getColumnRow, getPossibleColumns } from './c4';

export function minimax(
	board: C4Board,
	depth: number,
	alpha: number,
	beta: number,
	maximizingPlayer: boolean
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

// # Function to score the position of a game board for a given player.
// def score_position(board, piece):
//     score = 0
//     opponent_piece = PLAYER_PIECE

//     # Evaluation board for scoring positions on the actual game board.

//     # TODO: Fill in values for this board. Give higher values to the positions that you think
//     # lead to more wins, and lower values to the positions you think can result in less winning combinations.
//     evaluation_board = np.array([[0, 0, 0, 0, 0, 0, 0],
//                                  [0, 0, 0, 0, 0, 0, 0],
//                                  [0, 0, 0, 0, 0, 0, 0],
//                                  [0, 0, 0, 0, 0, 0, 0],
//                                  [0, 0, 0, 0, 0, 0, 0],
//                                  [0, 0, 0, 0, 0, 0, 0]])

//     # Calculate scores for the given player's and opponent's pieces on the board.
//     piece_score = np.sum(evaluation_board[board == piece])
//     opponent_score = np.sum(evaluation_board[board == opponent_piece])

//     # Calculate the final score by subtracting the opponent's score from the player's score.
//     score = piece_score - opponent_score
//     return score

// # Function to check if a game board is a terminal node (end of the game).
// def is_terminal_node(board):
//     return winning_move(board, PLAYER_PIECE) or winning_move(board, AI_PIECE) or (len(get_valid_locations(board)) == 0)

// # Minimax algorithm with Alpha-Beta Pruning for finding the best move on the game board.
// def minimax(board, depth, alpha, beta, maximizingPlayer):
//     valid_locations = get_valid_locations(board)
//     is_terminal = is_terminal_node(board)

//     # Base case: If the depth is zero or the game is over, return the current board's score.
//     if depth == 0 or is_terminal:
//         if is_terminal:
//             if winning_move(board, AI_PIECE):
//                 return (None, math.inf)
//             elif winning_move(board, PLAYER_PIECE):
//                 return (None, -math.inf)
//             else: # Game is over, no more valid moves
//                 return (None, 0)
//         else: # Depth is zero
//             return (None, score_position(board, AI_PIECE))

//     # Maximize the score if it's the maximizing player's turn
//     if maximizingPlayer:
//         value = -math.inf
//         column = random.choice(valid_locations)
//         for col in valid_locations:
//             row = get_next_open_row(board, col)
//             b_copy = board.copy()
//             drop_piece(b_copy, row, col, AI_PIECE)
//             new_score = minimax(b_copy, depth-1, alpha, beta, False)[1]

//             # Update the best move and alpha value.
//             if new_score > value:
//                 value = new_score
//                 column = col
//             alpha = max(alpha, value)

//             # Prune the search if the alpha value is greater than or equal to beta.
//             if alpha >= beta:
//                 break
//         return column, value

//     else: # Minimize the score if it's the minimizing player's turn.
//         value = math.inf
//         column = random.choice(valid_locations)
//         for col in valid_locations:
//             row = get_next_open_row(board, col)
//             b_copy = board.copy()
//             drop_piece(b_copy, row, col, PLAYER_PIECE)
//             new_score = minimax(b_copy, depth-1, alpha, beta, True)[1]

//             # Update the best move and beta value.
//             if new_score < value:
//                 value = new_score
//                 column = col
//             beta = min(beta, value)

//             # Prune the search if the alpha value is greater than or equal to beta
//             if alpha >= beta:
//                 break
//         return column, value
