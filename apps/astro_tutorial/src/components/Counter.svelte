<script lang='ts'>
	let count = $state(0)


</script>

<button onclick={() => count += 1} class='btn btn-xl btn-secondary mb-4'>Svelte Clicker: {count}</button>