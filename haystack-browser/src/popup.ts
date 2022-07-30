import { processDocument } from "./utils/processDocument";

const elements = {
	loading: document.getElementById("loading") as HTMLDivElement,
	main: document.getElementById("main") as HTMLDivElement,
	titleInput: document.getElementById("title-input") as HTMLInputElement,
	descInput: document.getElementById("desc-input") as HTMLTextAreaElement,
	urlInput: document.getElementById("url-input") as HTMLInputElement,
	imageUrlInput: document.getElementById(
		"image-url-input"
	) as HTMLInputElement,
	ratingInput: document.getElementById("rating-input") as HTMLInputElement,
	publishedAtInput: document.getElementById(
		"published-at-input"
	) as HTMLInputElement,
	submitBtn: document.getElementById("submit-btn") as HTMLButtonElement,
};

/* -------------------------------------------------------------------------- */
/*                                    Main                                    */
/* -------------------------------------------------------------------------- */

(async () => {
	/* ----------------- Replace loading screen with main screen ---------------- */

	elements.loading.style.display = "none";
	elements.main.style.display = "flex";

	/* --------------------------- Get current tab ID --------------------------- */

	const tabID = (
		await chrome.tabs.query({
			active: true,
			currentWindow: true,
		})
	)[0].id as number; // Since the popup runs on the current tab, we assume it exists

	/* ----------- Execute script on document to get default item data ---------- */

	let { result } = (
		await chrome.scripting.executeScript({
			target: { tabId: tabID },
			func: processDocument,
		})
	)[0];

	/* -------------- Update input elements with default item data -------------- */

	elements.titleInput.value = result.title || "";
	elements.descInput.value = result.desc || "";
	elements.urlInput.value = result.url || "";
	elements.imageUrlInput.value = result.imageUrl || "";

	/* ------------------------- Submit to local client ------------------------- */

	elements.submitBtn.addEventListener("click", async () => {
		fetch("http://localhost:3000/api/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: elements.titleInput.value,
				desc: elements.descInput.value || null,
				url: elements.urlInput.value,
				imageUrl: elements.imageUrlInput.value || null,
				rating: +elements.ratingInput.value,
				datePublished: elements.publishedAtInput.value || null,
				dateLatest: elements.publishedAtInput.value || null,
			}),
		});
	});
})();
