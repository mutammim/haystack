export function processDocument() {
	// TODO: Get ld-json content

	/* -------------------------------- Get title ------------------------------- */

	let ogTitle = (
		document.querySelector("meta[property='og:title']") as HTMLMetaElement
	)?.content;

	let twitterTitle = (
		document.querySelector("meta[name='twitter:title']") as HTMLMetaElement
	)?.content;

	let standardTitle = document.title;

	const title: string | null =
		ogTitle || twitterTitle || standardTitle || null;

	/* ----------------------------- Get description ---------------------------- */

	let ogDesc = (
		document.querySelector(
			"meta[property='og:description']"
		) as HTMLMetaElement
	)?.content;

	let twitterDesc = (
		document.querySelector(
			"meta[name='twitter:description']"
		) as HTMLMetaElement
	)?.content;

	let standardDesc = (
		document.querySelector("meta[name='description']") as HTMLMetaElement
	)?.content;

	const desc = ogDesc || twitterDesc || standardDesc || null;

	/* --------------------------------- Get URL -------------------------------- */

	let ogUrl = (
		document.querySelector("meta[property='og:url']") as HTMLMetaElement
	)?.content;

	let standardUrl = document.URL;

	const url: string | null = ogUrl || standardUrl || null;

	/* ------------------------------ Get image URL ----------------------------- */

	let ogImageUrl = (
		document.querySelector("meta[property='og:image']") as HTMLMetaElement
	)?.content;

	let twitterImageUrl = (
		document.querySelector(
			"meta[property='twitter:image']"
		) as HTMLMetaElement
	)?.content;

	let imageUrl: string | null = ogImageUrl || twitterImageUrl || null;

	/* --------------------------- Get published date --------------------------- */

	// TODO: Get published date

	let datePublished = null;

	/* ----------------------------- Get latest date ---------------------------- */

	// TODO: Get latest date

	let dateLatest = null;

	/* ------------------------------- Return data ------------------------------ */

	return {
		title,
		desc,
		url,
		imageUrl,
		datePublished,
		dateLatest,
	};
}
