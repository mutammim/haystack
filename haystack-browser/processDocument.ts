import { parseISO } from "date-fns";

interface ProcessedResult {
	title: string | null;
	desc: string | null;
	url: string | null;
	imageUrl: string | null;
	datePublished: string | null;
	dateLatest: string | null;
}

export function processDocument(document: Document): ProcessedResult {
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

	let ogDatePublished = (
		document.querySelector(
			"meta[property='article:published_time']"
		) as HTMLMetaElement
	)?.content;

	ogDatePublished
		? (ogDatePublished = parseISO(ogDatePublished)
				.toISOString()
				.slice(0, -5))
		: null;

	let datePublished: string | null = ogDatePublished || null;

	/* ----------------------------- Get latest date ---------------------------- */

	let ogDateModified = (
		document.querySelector(
			"meta[property='article:modified_time']"
		) as HTMLMetaElement
	)?.content;

	ogDateModified
		? (ogDateModified = parseISO(ogDateModified).toISOString().slice(0, -5))
		: null;

	let dateLatest: string | null = ogDateModified || ogDatePublished || null;

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
