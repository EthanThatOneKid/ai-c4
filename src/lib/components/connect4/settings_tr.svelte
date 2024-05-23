<script lang="ts">
	import { Connect4PlayerType, Connect4Player, makeConnect4PlayerString } from '$lib/connect4';
	import { store } from './store';

	export let player: Connect4Player;
</script>

<tr>
	<td>{makeConnect4PlayerString(player)}</td>
	<td>
		<select bind:value={$store.settings[player].type}>
			<option value={Connect4PlayerType.USER}>User</option>
			<option value={Connect4PlayerType.AI}>AI</option>
			<option value={Connect4PlayerType.RANDOM}>Random</option>
		</select>
	</td>
	<td>
		<input type="color" bind:value={$store.settings[player].color} />
	</td>
</tr>
