export function makeEmptyConnect4Board(): Connect4Board {
	return Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => -1));
}

export function getAvailableColumns(board: Connect4Board): number[] {
	const columns: number[] = [];
	for (let column = 0; column < 7; column++) {
		if (board[board.length - 1][column] === -1) {
			columns.push(column);
		}
	}

	return columns;
}

export function drop(board: Connect4Board, column: number, player: Connect4Player): Connect4Board {
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

export function connects4(board: Connect4Board, player: Connect4Player): boolean {
	return (
		connects4Horizontal(board, player) ||
		connects4Vertical(board, player) ||
		connects4Diagonal(board, player)
	);
}

export function connects4Horizontal(board: Connect4Board, player: Connect4Player): boolean {
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

export function connects4Vertical(board: Connect4Board, player: Connect4Player): boolean {
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

export function connects4Diagonal(board: Connect4Board, player: Connect4Player): boolean {
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

export interface Connect4 {
	board: Connect4Board;
	logs: Connect4Drop[];
	winner?: Connect4Player;
	settings: [Connect4PlayerSettings, Connect4PlayerSettings];
}

export function getNextPlayer(logs: Connect4Drop[]): Connect4Player {
	const currentPlayer = getRecentDrop(logs)?.player;
	if (currentPlayer === undefined) {
		return 0;
	}

	return ((currentPlayer + 1) % 2) as Connect4Player;
}

export function getRecentDrop(logs: Connect4Drop[]): Connect4Drop | undefined {
	return logs.at(-1);
}

/**
 * Connect4Drop is a player's turn in the game.
 *
 * An undefined column value indicates that the player forfeits the game.
 */
export interface Connect4Drop {
	player: Connect4Player;
	column?: number;
}

export function makeConnect4BoardCellString(cell: Connect4BoardCell): string {
	if (cell === -1) {
		return '';
	}

	return makeConnect4PlayerString(cell);
}

export type Connect4Board = Connect4BoardCell[][];

export type Connect4BoardCell = Connect4Player | -1;

export function makeConnect4PlayerString(player: Connect4Player): string {
	return ['1', '2'][player];
}

export type Connect4Player = 0 | 1;

export interface Connect4PlayerSettings {
	type: Connect4PlayerType;
	color: string;
}

export enum Connect4PlayerType {
	USER = 'user',
	AI = 'ai',
	RANDOM = 'random'
}
