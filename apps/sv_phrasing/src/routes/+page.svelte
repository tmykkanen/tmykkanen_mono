<script lang="ts">
	// import { draggable } from '@neodrag/svelte'

	// TODO: Add fetch for ESV data

	type Word = {
		word: string
		id: string
	}

	type TextGroup = {
		textGroupId: string
		contents: Word[]
	}

	let data: TextGroup[] = $state([
		{
			textGroupId: crypto.randomUUID(),
			contents: [
				{
					word: 'this',
					id: crypto.randomUUID(),
				},
				{
					word: 'is',
					id: crypto.randomUUID(),
				},
				{
					word: 'a',
					id: crypto.randomUUID(),
				},
				{
					word: 'sentence',
					id: crypto.randomUUID(),
				},
			],
		},
		{
			textGroupId: crypto.randomUUID(),
			contents: [
				{
					word: 'with',
					id: crypto.randomUUID(),
				},
				{
					word: 'multiple',
					id: crypto.randomUUID(),
				},
				{
					word: 'arrays',
					id: crypto.randomUUID(),
				},
			],
		},
	])

	const splitGroup = (groupIndex: number, wordIndex: number) => {
		const group = data[groupIndex]
		const { contents } = group

		const newGroupBeforeWord = {
			textGroupId: crypto.randomUUID(),
			contents: contents.slice(0, wordIndex),
		}

		const newGroupWordAndAfter = {
			textGroupId: crypto.randomUUID(),
			contents: contents.slice(wordIndex),
		}

		return { newGroupBeforeWord, newGroupWordAndAfter }
	}

	const handleClick = (e: MouseEvent) => {
		// Set variables
		const clickTarget = e.target as HTMLDivElement
		console.log(clickTarget)
		// Make TS happy for parentElement
		if (!clickTarget.parentElement) return
		const targetDiv = clickTarget.parentElement.dataset.textGroup
		if (!targetDiv) return

		const targetWord = clickTarget.innerHTML.trim()

		// Find indexes for Group and Word
		const groupIndex = data.findIndex((obj) => obj.textGroupId === targetDiv)
		const wordIndex = data[groupIndex].contents.findIndex((obj) => obj.word === targetWord)

		// CHECK for clicking first word
		if (wordIndex === 0) return

		// Split group at clicked word
		const { newGroupBeforeWord, newGroupWordAndAfter } = splitGroup(groupIndex, wordIndex)

		// Modify origianl data
		data.splice(groupIndex, 1, newGroupBeforeWord, newGroupWordAndAfter)

		// Renumber textGroupIds
		// data.forEach((obj, i) => {
		// 	obj.textGroupId = crypto.randomUUID()
		// })
	}

	$inspect(data).with(console.trace)
</script>

<h1 class="text-4xl">Testing String Split</h1>

<!-- TODO: Add Handles for Draggable -->
<!-- TODO: Add draggable rules -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onmousedown={(e) => handleClick(e)}>
	{#each data as { textGroupId, contents }}
		<div data-text-group={textGroupId}>
			{#each contents as { word, id }}
				<span data-word-Id={id}>{`${word}\n`}</span>
			{/each}
		</div>
	{/each}
</div>
