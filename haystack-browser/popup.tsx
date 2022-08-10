import React, { useEffect, useState } from "react";

import { processDocument } from "~processDocument";

import "./globals.css";

interface PopupResult {
	title: string | null;
	desc: string | null;
	url: string | null;
	imageUrl: string | null;
	rating: number;
	datePublished: string | null;
	dateLatest: string | null;
}

function IndexPopup() {
	const [data, setData] = useState<PopupResult>({
		title: null,
		desc: null,
		url: null,
		imageUrl: null,
		rating: 1,
		datePublished: null,
		dateLatest: null,
	});
	const [isLoading, setLoading] = useState(false);
	const [isSubmitted, setSubmitted] = useState(false);

	useEffect(() => {
		chrome.tabs
			.query({
				active: true,
				currentWindow: true,
			})
			.then(async ([{ id: tabID }]) => {
				let rawHTML = await chrome.scripting.executeScript({
					target: { tabId: tabID! },
					func: () => {
						// TODO: I can't seem to run NPM modules inside a content
						// script, so this is the solution for now. Maybe there's a better way?
						return document.documentElement.outerHTML;
					},
				});

				const parser = new DOMParser();
				const doc = parser.parseFromString(
					rawHTML[0].result,
					"text/html"
				);
				let result = processDocument(doc);

				setData(() => ({ rating: 1, ...result }));
				setLoading(false);
			});
	}, []);

	const loadingScreen = <div>Loading...</div>;
	const mainScreen = (
		<>
			<input
				type="text"
				className="
					border-2 bg-white rounded-md border-gray-200 font-bold text-slate-700 transition-colors
					focus-visible:border-emerald-500 focus-visible:ring focus-visible:ring-emerald-200 focus-visible:ring-opacity-50
				"
				placeholder="Title"
				value={data.title ? data.title : ""}
				autoFocus
				onChange={(e) => setData({ ...data, title: e.target.value })}
			/>

			<textarea
				id="desc-input"
				className="
					border-2 bg-white rounded-md border-gray-200 text-slate-700 h-40 transition-colors
					focus-visible:border-emerald-500 focus-visible:ring focus-visible:ring-emerald-200 focus-visible:ring-opacity-50
				"
				placeholder="Description"
				value={data.desc ? data.desc : ""}
				onChange={(e) => setData({ ...data, desc: e.target.value })}
			></textarea>

			<input
				type="text"
				className="
					border-2 bg-white rounded-md border-gray-200 text-slate-700 transition-colors
					focus-visible:border-emerald-500 focus-visible:ring focus-visible:ring-emerald-200 focus-visible:ring-opacity-50
				"
				placeholder="URL"
				value={data.url ? data.url : ""}
				onChange={(e) => setData({ ...data, url: e.target.value })}
			/>

			<input
				type="text"
				className="
					border-2 bg-white rounded-md border-gray-200 text-slate-700 transition-colors
					focus-visible:border-emerald-500 focus-visible:ring focus-visible:ring-emerald-200 focus-visible:ring-opacity-50
				"
				placeholder="Image URL"
				value={data.imageUrl ? data.imageUrl : ""}
				onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
			/>

			<select
				className="
					border-2 bg-white rounded-md border-gray-200 text-slate-700 transition-colors
					focus-visible:border-emerald-500 focus-visible:ring focus-visible:ring-emerald-200 focus-visible:ring-opacity-50
				"
				onChange={(e) => setData({ ...data, rating: +e.target.value })}
			>
				<option value={1}>1 (store for later)</option>
				<option value={2}>2 (very good)</option>
				<option value={3}>3 (one of the best)</option>
			</select>

			<div className="flex flex-col gap-2">
				<label
					htmlFor="date-published-selector font-bold"
					className="text-slate-600"
				>
					Published date
				</label>
				<input
					type="datetime-local"
					id="date-published-selector"
					className="
						border-2 bg-white rounded-md border-gray-200 text-slate-700
						focus-visible:border-emerald-500 focus-visible:ring focus-visible:ring-emerald-200 focus-visible:ring-opacity-50
					"
					value={data.datePublished ? data.datePublished : undefined}
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label
					htmlFor="date-latest-selector"
					className="text-slate-600 font-bold"
				>
					Latest date
				</label>
				<input
					type="datetime-local"
					id="date-latest-selector"
					className="
						border-2 bg-white rounded-md border-gray-200 text-slate-700
						focus-visible:border-emerald-500 focus-visible:ring focus-visible:ring-emerald-200 focus-visible:ring-opacity-50
					"
					value={data.dateLatest ? data.dateLatest : undefined}
				></input>
			</div>

			<button
				type="submit"
				className="
					bg-emerald-500 rounded-full p-2 text-white text-lg font-bold hover:bg-emerald-600 transition-colors
					active:ring active:ring-emerald-200 active:ring-opacity-50
					focus-visible:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-50
				"
				tabIndex={10}
				disabled={isSubmitted}
				onClick={() => {
					if (data.title === null || data.title === "") {
						// Reject
					} else {
						fetch("http://localhost:3000/api/add", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								title: data.title,
								desc: data.desc,
								url: data.url,
								imageUrl: data.imageUrl,
								rating: data.rating,
								datePublished: data.datePublished,
								dateLatest: data.dateLatest,
							}),
						});

						setSubmitted(true);
					}
				}}
			>
				{isSubmitted ? "Submitted!" : "Submit"}
			</button>
		</>
	);

	return (
		<main className="flex flex-col scroll-auto gap-4 p-4 selection:bg-emerald-500 selection:text-white">
			<>{isLoading ? loadingScreen : mainScreen}</>
		</main>
	);
}

export default IndexPopup;
