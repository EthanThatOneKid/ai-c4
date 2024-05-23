<script lang="ts">
	import Connect4 from '$lib/components/connect4/connect4.svelte';
</script>

<svelte:head>
	<title>Connect 4 AI | etok.codes/connect4-ai</title>
</svelte:head>

<main>
	<Connect4 />
</main>

<style>
	main {
		margin: 0 auto;
		padding: 0;
		width: min(100%, 500px);
	}
</style>
