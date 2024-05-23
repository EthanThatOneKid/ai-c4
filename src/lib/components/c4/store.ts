import { writable } from 'svelte/store';
import type { C4 } from '$lib/c4';
import { C4PlayerType, makeEmptyC4Board } from '$lib/c4';

export function restart() {
	store.update((store) => {
		store.board = makeEmptyC4Board();
		store.logs = [];
		delete store.winner;
		return store;
	});
}

const DEFAULT_SETTINGS = [
	{
		type: C4PlayerType.USER,
		color: '#ff0000'
	},
	{
		type: C4PlayerType.AI,
		color: '#ffff00'
	}
] satisfies C4['settings'];

export const store = writable<C4>({
	board: makeEmptyC4Board(),
	settings: DEFAULT_SETTINGS,
	logs: []
});
