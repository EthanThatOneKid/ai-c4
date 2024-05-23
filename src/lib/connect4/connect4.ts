export function getAvailableColumnsOfBitmap(bitmap: Connect4Bitmap): number[] {
	return getAvailableColumns(makeConnect4Board(bitmap));
}

export function getAvailableColumns(board: Connect4Board): number[] {
	return board[0].map((_, i) => i).filter((i) => board[5][i] === 0);
}

export function makeEmptyConnect4Board(): Connect4Board {
	return Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => 0));
}

export function makeEmptyConnect4Bitmap(): Connect4Bitmap {
	return { position: 0, mask: 0 };
}

export function makeConnect4Bitmap(board: Connect4Board, player: number): Connect4Bitmap {
	let position = '';
	let mask = '';
	for (let j = 6; j >= 0; j--) {
		mask += '0';
		position += '0';
		for (let i = 0; i < 6; i++) {
			mask += ['0', '1'][board[i][j] === 0 ? 0 : 1];
			position += ['0', '1'][board[i][j] !== player ? 0 : 1];
		}
	}

	return { position: parseInt(position, 2), mask: parseInt(mask, 2) };
}

export function makeConnect4Board(bitmap: Connect4Bitmap): Connect4Board {
	const mask = bitmap.mask.toString(2).padStart(49, '0');
	const position = bitmap.position.toString(2).padStart(42, '0');
	return Array.from({ length: 6 }, (_, i) =>
		Array.from({ length: 7 }, (_, j) => {
			const index = i + j * 6;
			return mask[index] === '1' ? 1 : position[index] === '1' ? 2 : 0;
		})
	);
	// // const position = bitmap.position.toString(2).padStart(42, '0');
	// const mask = bitmap.mask.toString(2).padStart(49, '0');
	// for (let j = 6; j >= 0; j--) {
	// 	for (let i = 0; i < 6; i++) {
	// 		const index = i + j * 6;
	// 		board[i][j] = position[index] === '1' ? 1 : 2;
	// 	}
	// }

	// return board;
}

export function connects4(position: number): boolean {
	let m = position & (position >> 7);
	if (m & (m >> 14)) {
		return true;
	}

	m = position & (position >> 6);
	if (m & (m >> 12)) {
		return true;
	}

	m = position & (position >> 8);
	if (m & (m >> 16)) {
		return true;
	}

	m = position & (position >> 1);
	if (m & (m >> 2)) {
		return true;
	}

	return false;
}

export function drop(bitmask: Connect4Bitmap, column: number): Connect4Bitmap {
	return {
		position: bitmask.position ^ bitmask.mask,
		mask: bitmask.mask | (bitmask.mask + (1 << (column * 7)))
	};
}

export interface Connect4 {
	bitmap: Connect4Bitmap;
	logs: Connect4Drop[];
	settings: [Connect4PlayerSettings, Connect4PlayerSettings];
}

export function getNextPlayer(logs: Connect4Drop[]): Connect4Player {
	if (logs.length === 0) {
		return Connect4Player.ONE;
	}

	return logs[logs.length - 1].player === Connect4Player.ONE
		? Connect4Player.TWO
		: Connect4Player.ONE;
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

export function makeConnect4PlayerString(player: Connect4Player): string {
	return player === Connect4Player.ONE ? '1' : '2';
}

export enum Connect4Player {
	ONE = 0,
	TWO = 1
}

export interface Connect4PlayerSettings {
	type: Connect4PlayerType;
	color: string;
}

export enum Connect4PlayerType {
	USER = 'user',
	AI = 'ai',
	RANDOM = 'random'
}

export type Connect4Board = number[][];

export interface Connect4Bitmap {
	position: number;
	mask: number;
}
