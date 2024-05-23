export function makeEmptyC4Board(): C4Board {
	return Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => -1));
}

export function getAvailableColumns(board: C4Board): number[] {
	const columns: number[] = [];
	for (let column = 0; column < 7; column++) {
		if (board[board.length - 1][column] === -1) {
			columns.push(column);
		}
	}

	return columns;
}

export function checkColumnAvailability(board: C4Board, column: number): boolean {
	return board[board.length - 1][column] === -1;
}

export function drop(board: C4Board, column: number, player: C4Player): C4Board {
	if (column < 0 || column > 6) {
		throw new Error(`Invalid column: ${column}`);
	}

	const newBoard = board.map((row) => row.slice());
	const row = newBoard.findIndex((row) => row[column] === -1);
	if (row === -1) {
		throw new Error(`Column ${column} is full`);
	}

	newBoard[row][column] = player;
	return newBoard;
}

export function connects4(board: C4Board, player: C4Player): boolean {
	return (
		connects4Horizontal(board, player) ||
		connects4Vertical(board, player) ||
		connects4Diagonal(board, player)
	);
}

export function connects4Horizontal(board: C4Board, player: C4Player): boolean {
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 4; col++) {
			if (
				board[row][col] === player &&
				board[row][col + 1] === player &&
				board[row][col + 2] === player &&
				board[row][col + 3] === player
			) {
				return true;
			}
		}
	}

	return false;
}

export function connects4Vertical(board: C4Board, player: C4Player): boolean {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 7; col++) {
			if (
				board[row][col] === player &&
				board[row + 1][col] === player &&
				board[row + 2][col] === player &&
				board[row + 3][col] === player
			) {
				return true;
			}
		}
	}

	return false;
}

export function connects4Diagonal(board: C4Board, player: C4Player): boolean {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 4; col++) {
			if (
				board[row][col] === player &&
				board[row + 1][col + 1] === player &&
				board[row + 2][col + 2] === player &&
				board[row + 3][col + 3] === player
			) {
				return true;
			}
		}
	}

	for (let row = 0; row < 3; row++) {
		for (let col = 3; col < 7; col++) {
			if (
				board[row][col] === player &&
				board[row + 1][col - 1] === player &&
				board[row + 2][col - 2] === player &&
				board[row + 3][col - 3] === player
			) {
				return true;
			}
		}
	}

	return false;
}

export interface C4 {
	board: C4Board;
	logs: C4Drop[];
	winner?: C4Player;
	settings: [C4PlayerSettings, C4PlayerSettings];
}

export function getNextPlayer(logs: C4Drop[]): C4Player {
	const currentPlayer = getRecentDrop(logs)?.player;
	if (currentPlayer === undefined) {
		return 0;
	}

	return ((currentPlayer + 1) % 2) as C4Player;
}

export function getRecentDrop(logs: C4Drop[]): C4Drop | undefined {
	return logs.at(-1);
}

/**
 * C4Drop is a player's turn in the game.
 *
 * An undefined column value indicates that the player forfeits the game.
 */
export interface C4Drop {
	player: C4Player;
	column?: number;
}

export function makeC4BoardCellString(cell: C4BoardCell): string {
	if (cell === -1) {
		return '';
	}

	return makeC4PlayerString(cell);
}

export type C4Board = C4BoardCell[][];

export type C4BoardCell = C4Player | -1;

export function makeC4PlayerString(player: C4Player): string {
	return ['1', '2'][player];
}

export type C4Player = 0 | 1;

export interface C4PlayerSettings {
	type: C4PlayerType;
	color: string;
}

export enum C4PlayerType {
	USER = 'user',
	AI = 'ai',
	RANDOM = 'random'
}
