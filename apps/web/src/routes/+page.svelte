<script lang="ts">
	import { draggable } from '@neodrag/svelte'

	// TODO: Add fetch for ESV data

	type Word = {
		word: string
		id: number
	}

	type TextGroup = {
		textGroupId: string
		contents: Word[]
	}

	let data: TextGroup[] = $state([
		{
			textGroupId: 'text-group-1',
			contents: [
				{
					word: 'this',
					id: 1,
				},
				{
					word: 'is',
					id: 2,
				},
				{
					word: 'a',
					id: 3,
				},
				{
					word: 'sentence',
					id: 4,
				},
			],
		},
		{
			textGroupId: 'text-group-2',
			contents: [
				{
					word: 'with',
					id: 5,
				},
				{
					word: 'multiple',
					id: 6,
				},
				{
					word: 'arrays',
					id: 7,
				},
			],
		},
	])

	const splitGroup = (groupIndex: number, wordIndex: number) => {
		const group = data[groupIndex]
		const { contents } = group

		const newGroupBeforeWord = {
			textGroupId: '',
			contents: contents.slice(0, wordIndex),
		}

		const newGroupWordAndAfter = {
			textGroupId: '',
			contents: contents.slice(wordIndex),
		}

		return { newGroupBeforeWord, newGroupWordAndAfter }
	}

	const handleClick = (e: MouseEvent) => {
		// Set variables
		const clickTarget = e.target as HTMLDivElement
		// Make TS happy for parentElement
		if (!clickTarget.parentElement) return
		const targetDiv = clickTarget.parentElement.dataset.textGroup
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
		data.forEach((obj, i) => {
			obj.textGroupId = `text-group-${i + 1}`
		})
	}
</script>

<h1 class="text-4xl">Testing String Split</h1>

<!-- TODO: Add Handles for Draggable -->
<!-- TODO: Add draggable rules -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onmousedown={(e) => handleClick(e)}>
	{#each data as { textGroupId, contents }}
		<div data-text-group={textGroupId}>
			{#each contents as { word, id }}
				<span data-word-Id={`word-${id}`}>{`${word}\n`}</span>
			{/each}
		</div>
	{/each}
</div>
