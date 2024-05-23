<script lang="ts">
	import { Connect4Player } from '$lib/connect4';
	import SettingsTr from './settings_tr.svelte';
</script>

<table>
	<thead>
		<tr>
			<th>Player</th>
			<th>Type</th>
			<th>Color</th>
		</tr>
	</thead>

	<SettingsTr player={Connect4Player.ONE} />
	<SettingsTr player={Connect4Player.TWO} />
</table>
