<script>
	let state = $state({ value: 0 })
	let derived = $derived({ value: state.value * 2 })

	// this will run once, because `state` is never reassigned (only mutated)
	$effect(() => {
		console.log('state: runs once')
		state
	})

	// this will run whenever `state.value` changes...
	$effect(() => {
		console.log('state.value: runs on state.value change')
		state.value
	})

	// ...and so will this, because `derived` is a new object each time
	$effect(() => {
		console.log('derived: derived from state.value, runs on change')
		derived
	})
</script>

<button onclick={() => (state.value += 1)}>
	{state.value}
</button>

<p>{state.value} doubled is {derived.value}</p>
