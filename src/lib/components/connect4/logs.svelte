<script lang="ts">
	import { connect4Store } from './store';
</script>

<table>
	<thead>
		<tr>
			<th>#</th>
			<th>Player</th>
			<th>Column</th>
		</tr>
	</thead>

	{#each $connect4Store.logs as { column, player }, index}
		<tr>
			<td>{index + 1}</td>
			<td>{player === 1 ? 'Player 1' : 'Player 2'}</td>
			<td>
				{#if column === undefined}
					Forfeit
				{:else}
					{column + 1}
				{/if}
			</td>
		</tr>
	{/each}
</table>
