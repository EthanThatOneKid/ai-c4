<script lang="ts">
	import C4 from '$lib/components/c4/c4.svelte';
</script>

<svelte:head>
	<title>Connect 4 AI | etok.codes/ai-c4</title>
	<meta name="description" content="Artificially intelligent Connect 4." />
	<link
		rel="stylesheet"
		type="text/css"
		href="https://ethanthatonekid.github.io/dropin-minimal-css/min/axist.min.css"
	/>
</svelte:head>

<main>
	<C4 />
</main>

<style>
	main {
		margin: 0 auto;
		width: min(100%, 500px);
	}
</style>
