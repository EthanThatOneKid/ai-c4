<script lang="ts">
	import {
		drop,
		getNextPlayer,
		C4PlayerType,
		makeC4BoardCellString,
		getPossibleColumns,
		connects4
	} from '$lib/c4';
	import { minimax } from '$lib/c4/ai';
	import { restart, store } from './store';

	function confirmGameOverRestart(): boolean {
		if ($store.winner !== undefined) {
			const willRestart = confirm(`Player ${$store.winner + 1} wins! Restart?`);
			if (willRestart) {
				restart();
			}

			return true;
		}

		return false;
	}

	function handleColumnClick(column: number) {
		if (confirmGameOverRestart()) {
			return;
		}

		const player = getNextPlayer($store.logs);
		$store.logs.push({ column, player });
		$store.board = drop($store.board, column, player);
		if (connects4($store.board, player)) {
			$store.winner = player;
			setTimeout(() => confirmGameOverRestart(), 0);
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
				const [bestColumn] = minimax($store.board, 6, -Infinity, Infinity, true);
				if (bestColumn === null) {
					throw new Error('No best column found');
				}

				handleColumnClick(bestColumn);
				break;
			}

			case C4PlayerType.RANDOM: {
				const columns = getPossibleColumns($store.board);
				if (columns.length === 0) {
					throw new Error('No available columns');
				}

				const randomColumn = columns[Math.floor(Math.random() * columns.length)];
				handleColumnClick(randomColumn);
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
				<td on:click={() => handleColumnClick(columnIndex)}>
					<div class="cell" class:player1={cell === 0} class:player2={cell === 1}>
						{makeC4BoardCellString(cell)}
					</div>
				</td>
			{/each}
		</tr>
	{/each}
</table>

{#if $store.winner !== undefined}
	<p>Player {$store.winner + 1} wins!</p>
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
