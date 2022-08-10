/**
 * @type {import('prettier').Options}
 */
module.exports = {
	tabWidth: 4,
	useTabs: true,
	plugins: [require.resolve("@plasmohq/prettier-plugin-sort-imports")],
	importOrder: ["^@plasmohq/(.*)$", "^~(.*)$", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
