<script lang="ts">
	import {
		drop,
		getNextPlayer,
		C4PlayerType,
		makeC4BoardCellString,
		getPossibleColumns,
		connects4,
		makeC4PlayerString
	} from '$lib/c4';
	import { minimax } from '$lib/c4/ai';
	import { restart, store } from './store';

	// TODO: Fix confirmGameOverRestart bug.
	function confirmGameOverRestart() {
		if ($store.winner === undefined) {
			throw new Error('No winner found');
		}

		const willRestart = confirm(`Player ${makeC4PlayerString($store.winner)} wins! Restart?`);
		if (willRestart) {
			setTimeout(restart, 0);
		}
	}

	function handleColumnInput(event: MouseEvent) {
		event.preventDefault();
		const columnString = (event.target as HTMLElement)?.getAttribute('data-column');
		if (columnString === null) {
			return;
		}

		const column = parseInt(columnString, 10);
		if (Number.isNaN(column)) {
			return;
		}

		inputColumn(column);
	}

	function inputColumn(column: number) {
		if ($store.winner !== undefined) {
			confirmGameOverRestart();
			return;
		}

		const player = getNextPlayer($store.logs);
		$store.logs.push({ column, player, playerType: $store.settings[player].type });
		$store.board = drop($store.board, column, player);
		if (connects4($store.board, player)) {
			$store.winner = player;
			setTimeout(confirmGameOverRestart, 0);
		}
	}

	store.subscribe(() => {
		if ($store.winner !== undefined) {
			return;
		}

		const player = getNextPlayer($store.logs);
		const playerType = $store.settings[player].type;
		switch (playerType) {
			case C4PlayerType.USER: {
				break;
			}

			case C4PlayerType.AI: {
				const [bestColumn] = minimax($store.board);
				if (bestColumn === null) {
					throw new Error('No best column found');
				}

				inputColumn(bestColumn);
				break;
			}

			case C4PlayerType.RANDOM: {
				const columns = getPossibleColumns($store.board);
				if (columns.length === 0) {
					throw new Error('No available columns');
				}

				const randomColumn = columns[Math.floor(Math.random() * columns.length)];
				inputColumn(randomColumn);
				break;
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
				<td>
					<button
						class="cell"
						class:player1={cell === 0}
						class:player2={cell === 1}
						data-column={columnIndex}
						on:click={handleColumnInput}
					>
						{makeC4BoardCellString(cell)}
					</button>
				</td>
			{/each}
		</tr>
	{/each}
</table>

{#if $store.winner !== undefined}
	<p>Player {makeC4PlayerString($store.winner)} wins!</p>
{/if}

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
