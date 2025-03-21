<script>
	async function roll() {
		// Fetch a random number from 1 to 6
		// (with a delay, so that we can see it)
		return new Promise((fulfil, reject) => {
			setTimeout(() => {
				// simulate a flaky network
				if (Math.random() < 0.3) {
					reject(new Error('Request failed'))
					return
				}

				fulfil(Math.ceil(Math.random() * 6))
			}, 1000)
		})
	}

	let p = $state(roll())
</script>

<button onclick={() => (p = roll())}> roll the dice </button>

{#await p}
	<p>...rolling</p>
{:then number}
	<p>you rolled a {number}!</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
