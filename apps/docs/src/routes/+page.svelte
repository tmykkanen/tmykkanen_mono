<script lang="ts">
	import AwaitExample from '$lib/awaitExample.svelte'
	import EffectExample from '$lib/effectExample.svelte'
	import { MyCounterButton } from '@repo/ui'
</script>

<h1>Docs</h1>
<MyCounterButton />
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<h2>$effect Example</h2>
<EffectExample />

<h2>#await block Example</h2>
<AwaitExample />
