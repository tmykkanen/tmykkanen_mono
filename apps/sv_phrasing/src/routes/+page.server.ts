import type { PageServerLoad } from './$types'
import { ESV_API_KEY } from '$env/static/private'

export const load: PageServerLoad = async ({ fetch }) => {
	const verseRef = 'Revelation+1:1–3'
	const query = `https://api.esv.org/v3/passage/text/?q=${verseRef}&include-passage-references=false&include-footnotes=false&include-verse-numbers=true&include-headings=false&include-short-copyright=false`

	const esvResText = await fetch(query, {
		headers: {
			Authorization: `Token ${ESV_API_KEY}`,
		},
	})
	const esvApiResObj = await esvResText.json()

	const passage = esvApiResObj.passages[0]

	return {
		object: 'This is an object',
		passage,
	}
}
