import { writable } from 'svelte/store';
import type { Connect4 } from '$lib/connect4';
import { Connect4PlayerType } from '$lib/connect4';

export const connect4Store = writable<Connect4>({
	bitmap: { position: 0, mask: 0 },
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
