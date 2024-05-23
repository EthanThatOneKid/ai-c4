<script lang="ts">
	import {
		drop,
		makeConnect4Board,
		getNextPlayer,
		getAvailableColumnsOfBitmap,
		Connect4PlayerType
	} from '$lib/connect4';
	import { connect4Store } from './store';

	function handleColumnClick(column: number) {
		$connect4Store.bitmap = drop($connect4Store.bitmap, column);
		const player = getNextPlayer($connect4Store.logs);
		$connect4Store.logs.push({ column, player });

		const nextPlayer = getNextPlayer($connect4Store.logs);
		const nextPlayerType = $connect4Store.settings[nextPlayer].type;
		switch (nextPlayerType) {
			case Connect4PlayerType.USER: {
				break;
			}

			case Connect4PlayerType.AI: {
				throw new Error('Not implemented');
			}

			case Connect4PlayerType.RANDOM: {
				const columns = getAvailableColumnsOfBitmap($connect4Store.bitmap);
				if (columns.length === 0) {
					throw new Error('No available columns');
				}

				const randomColumn = columns[Math.floor(Math.random() * columns.length)];
				handleColumnClick(randomColumn);
			}
		}
	}
</script>

<table
	style:--color-p1={$connect4Store.settings[0].color}
	style:--color-p2={$connect4Store.settings[1].color}
>
	{#each makeConnect4Board($connect4Store.bitmap) as row}
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
		width: 16px;
		height: 16px;
		border-radius: 50%;
	}

	.cell.player1 {
		background-color: var(--color-p1);
		outline: 1px solid black;
	}

	.cell.player2 {
		background-color: var(--color-p2);
		outline: 1px solid black;
	}
</style>
