<script lang="ts">
	import type { PageProps } from './$types.js'
	// import { draggable } from '@neodrag/svelte'

	// GET PROPS
	const { data }: PageProps = $props()
	const { passage } = data

	// TYPE DEFINITIONS
	type TextItem = {
		type: 'word' | 'verseNumber'
		value: string
		id: string
	}

	type TextGroup = {
		textGroupId: string
		contents: TextItem[]
	}

	// PROCESS IMPORTED DATA FROM API
	let passageDataProcessed: TextItem[] = []
	const passageAsStrings = passage.trim().split(' ') as string[]
	passageAsStrings.forEach((item) => {
		let itemObj: TextItem
		if (RegExp(/\[\d\]/).test(item)) {
			itemObj = {
				type: 'verseNumber',
				value: item,
				id: crypto.randomUUID(),
			}
		} else {
			itemObj = {
				type: 'word',
				value: item,
				id: crypto.randomUUID(),
			}
		}
		passageDataProcessed.push(itemObj)
	})

	// Assign passage data to contents of main data object
	const verseData: TextGroup[] = $state([
		{
			textGroupId: crypto.randomUUID(),
			contents: passageDataProcessed,
		},
	])

	$inspect(verseData)

	const splitGroup = (groupIndex: number, wordIndex: number) => {
		const group = verseData[groupIndex]
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
		console.log('clickTarget', clickTarget)
		// Make TS happy for parentElement
		if (!clickTarget.parentElement) return
		const targetDiv = clickTarget.parentElement.dataset.textGroup
		if (!targetDiv) return

		const targetWord = clickTarget.innerHTML.trim()
		console.log('target word', targetWord)

		// Find indexes for Group and Word
		const groupIndex = verseData.findIndex((obj) => obj.textGroupId === targetDiv)
		const wordIndex = verseData[groupIndex].contents.findIndex((obj) => obj.value === targetWord)

		// CHECK for clicking first word
		if (wordIndex === 0) return
		// Ensure verse number stays paired with following word
		const priorItem = verseData[groupIndex].contents[wordIndex - 1]
		if (RegExp(/\[\d\]/).test(priorItem.value)) return

		// Split group at clicked word
		const { newGroupBeforeWord, newGroupWordAndAfter } = splitGroup(groupIndex, wordIndex)

		// Modify origianl data
		verseData.splice(groupIndex, 1, newGroupBeforeWord, newGroupWordAndAfter)

		// Renumber textGroupIds
		// data.forEach((obj, i) => {
		// 	obj.textGroupId = crypto.randomUUID()
		// })
	}

	$inspect(verseData).with(console.trace)
</script>

<h1 class="text-4xl">Testing String Split</h1>

<!-- TODO: Add Handles for Draggable -->
<!-- TODO: Add draggable rules -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onmousedown={(e) => handleClick(e)}>
	{#each verseData as { textGroupId, contents }}
		<div data-text-group={textGroupId}>
			{#each contents as item}
				{#if item.type === 'verseNumber'}
					<span data-item-Id={item.id} class="font-bold text-green-600">{`${item.value}\n`}</span>
				{:else}
					<span data-item-Id={item.id}>{`${item.value}\n`}</span>
				{/if}
			{/each}
		</div>
	{/each}
</div>
