<script lang="ts">
	import { makeConnect4PlayerString } from '$lib/connect4';
	import { connect4Store } from './store';
</script>

<table>
	<thead>
		<tr>
			<th>Turn</th>
			<th>Player</th>
			<th>Column</th>
		</tr>
	</thead>

	{#each $connect4Store.logs as { column, player }, index}
		<tr>
			<td>{index + 1}</td>
			<td>{makeConnect4PlayerString(player)}</td>
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
