<script lang="ts">
	import { makeC4PlayerString, makeC4PlayerTypeString } from '$lib/c4';
	import { store } from './store';

	const colspan = '100%' as unknown as number;
</script>

<table>
	<thead>
		<tr>
			<th>Turn</th>
			<th>Player</th>
			<th>Player type</th>
			<th>Column</th>
		</tr>
	</thead>

	{#each $store.logs as { column, player, playerType }, index}
		<tr>
			<td>{index + 1}</td>
			<td>{makeC4PlayerString(player)}</td>
			<td>{makeC4PlayerTypeString(playerType)}</td>
			<td>
				{#if column === undefined}
					Forfeit
				{:else}
					{column + 1}
				{/if}
			</td>
		</tr>
	{:else}
		<tr>
			<td {colspan} align="center">No logs</td>
		</tr>
	{/each}
</table>
