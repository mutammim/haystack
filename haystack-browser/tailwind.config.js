/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["popup.tsx"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};
