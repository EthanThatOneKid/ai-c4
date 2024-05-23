import { writable } from 'svelte/store';
import type { Connect4 } from '$lib/connect4';
import { Connect4PlayerType, makeEmptyConnect4Bitmap } from '$lib/connect4';

export const store = writable<Connect4>({
	bitmap: makeEmptyConnect4Bitmap(),
	settings: [
		{
			type: Connect4PlayerType.USER,
			color: '#ff0000'
		},
		{
			type: Connect4PlayerType.AI,
			color: '#ffff00'
		}
	],
	logs: []
});
