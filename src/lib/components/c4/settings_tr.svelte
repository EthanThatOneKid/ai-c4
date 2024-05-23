<script lang="ts">
	import type { C4Player } from '$lib/c4';
	import { C4PlayerType, makeC4PlayerString } from '$lib/c4';
	import { store } from './store';

	export let player: C4Player;
</script>

<tr>
	<td>{makeC4PlayerString(player)}</td>
	<td>
		<select bind:value={$store.settings[player].type}>
			<option value={C4PlayerType.USER}>User</option>
			<option value={C4PlayerType.AI}>Artificial Intelligence</option>
			<option value={C4PlayerType.RANDOM}>Random</option>
		</select>
	</td>
	<td>
		<input type="color" bind:value={$store.settings[player].color} />
	</td>
</tr>
