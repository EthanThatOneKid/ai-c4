<script lang="ts">
	import { makeC4PlayerString } from '$lib/c4';
	import { store } from './store';
</script>

<table>
	<thead>
		<tr>
			<th>Turn</th>
			<th>Player</th>
			<th>Column</th>
		</tr>
	</thead>

	{#each $store.logs as { column, player }, index}
		<tr>
			<td>{index + 1}</td>
			<td>{makeC4PlayerString(player)}</td>
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
			<td colspan="3" align="center">No logs</td>
		</tr>
	{/each}
</table>
