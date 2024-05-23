<script lang="ts">
	import SettingsTr from './settings_tr.svelte';
	import { resetStore } from './store';
</script>

<table>
	<thead>
		<tr>
			<th>Player</th>
			<th>Type</th>
			<th>Color</th>
		</tr>
	</thead>

	<SettingsTr player={0} />
	<SettingsTr player={1} />
</table>

<button on:click={() => resetStore()}> Reset </button>
