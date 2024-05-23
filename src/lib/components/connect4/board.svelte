<script lang="ts">
	import {
		drop,
		makeConnect4Board,
		getNextPlayer,
		getAvailableColumnsOfBitmap,
		Connect4PlayerType
	} from '$lib/connect4';
	import { store } from './store';

	function handleColumnClick(column: number) {
		$store.bitmap = drop($store.bitmap, column);
		const player = getNextPlayer($store.logs);
		$store.logs.push({ column, player });

		const nextPlayer = getNextPlayer($store.logs);
		const nextPlayerType = $store.settings[nextPlayer].type;
		switch (nextPlayerType) {
			case Connect4PlayerType.USER: {
				break;
			}

			case Connect4PlayerType.AI: {
				throw new Error('Not implemented');
			}

			case Connect4PlayerType.RANDOM: {
				const columns = getAvailableColumnsOfBitmap($store.bitmap);
				if (columns.length === 0) {
					throw new Error('No available columns');
				}

				const randomColumn = columns[Math.floor(Math.random() * columns.length)];
				handleColumnClick(randomColumn);
			}
		}
	}
</script>

<table style:--color-p1={$store.settings[0].color} style:--color-p2={$store.settings[1].color}>
	{#each makeConnect4Board($store.bitmap) as row}
		<tr>
			{#each row as cell, columnIndex}
				<td on:click={() => handleColumnClick(columnIndex)}>
					<div class="cell" class:player1={cell === 1} class:player2={cell === 2}>{cell}</div>
				</td>
			{/each}
		</tr>
	{/each}
</table>

<style>
	.cell {
		display: grid;
		place-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		outline: 1px solid black;
		cursor: pointer;
	}

	.cell.player1 {
		background-color: var(--color-p1);
	}

	.cell.player2 {
		background-color: var(--color-p2);
	}
</style>
