<script lang="ts">
	import {
		drop,
		getNextPlayer,
		Connect4PlayerType,
		makeConnect4BoardCellString,
		getAvailableColumns,
		connects4
	} from '$lib/connect4';
	import { store } from './store';

	function handleColumnClick(column: number) {
		if ($store.winner !== undefined) {
			alert(`Player ${$store.winner + 1} has already won!`);
			return;
		}

		const player = getNextPlayer($store.logs);
		$store.logs.push({ column, player });
		$store.board = drop($store.board, column, player);
		if (connects4($store.board, player)) {
			$store.winner = player;
			alert(`Player ${player + 1} wins!`);
		}
	}

	store.subscribe(() => {
		if ($store.winner !== undefined) {
			return;
		}

		const player = getNextPlayer($store.logs);
		const playerType = $store.settings[player].type;
		switch (playerType) {
			case Connect4PlayerType.USER: {
				break;
			}

			case Connect4PlayerType.AI: {
				throw new Error('Not implemented');
			}

			case Connect4PlayerType.RANDOM: {
				const columns = getAvailableColumns($store.board);
				if (columns.length === 0) {
					console.table($store.board);
					throw new Error('No available columns');
				}

				const randomColumn = columns[Math.floor(Math.random() * columns.length)];
				handleColumnClick(randomColumn);
			}
		}
	});
</script>

<table style:--color-p1={$store.settings[0].color} style:--color-p2={$store.settings[1].color}>
	<tr>
		<th>1</th>
		<th>2</th>
		<th>3</th>
		<th>4</th>
		<th>5</th>
		<th>6</th>
		<th>7</th>
	</tr>
	{#each $store.board.toReversed() as row}
		<tr>
			{#each row as cell, columnIndex}
				<td on:click={() => handleColumnClick(columnIndex)}>
					<div class="cell" class:player1={cell === 0} class:player2={cell === 1}>
						{makeConnect4BoardCellString(cell)}
					</div>
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
