import { writable } from 'svelte/store';
import type { Connect4 } from '$lib/connect4';
import { Connect4PlayerType, makeEmptyConnect4Board } from '$lib/connect4';

export function restart() {
	store.update((store) => {
		store.board = makeEmptyConnect4Board();
		store.logs = [];
		delete store.winner;
		return store;
	});
}

const DEFAULT_SETTINGS = [
	{
		type: Connect4PlayerType.USER,
		color: '#ff0000'
	},
	{
		type: Connect4PlayerType.RANDOM,
		color: '#ffff00'
	}
] satisfies Connect4['settings'];

export const store = writable<Connect4>({
	board: makeEmptyConnect4Board(),
	settings: DEFAULT_SETTINGS,
	logs: []
});
