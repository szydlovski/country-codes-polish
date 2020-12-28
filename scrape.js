const axios = require('axios');
const { JSDOM } = require('jsdom');
const fs = require('fs').promises;
const path = require('path');

async function build() {
	const scrapedData = await scrapeData();
	const { full, alpha_2, alpha_3, numeric } = dataVariants(scrapedData);
	console.log('Saving files...');
	for (const [filepath, data] of [
		['codes.json', JSON.stringify(full, null, 2)],
		['alpha-2/index.json', JSON.stringify(alpha_2, null, 2)],
		['alpha-3/index.json', JSON.stringify(alpha_3, null, 2)],
		['numeric/index.json', JSON.stringify(numeric, null, 2)],
		['esm/index.js', esmify(JSON.stringify(full, null, 2))],
		['esm/alpha-2/index.js', esmify(JSON.stringify(alpha_2, null, 2))],
		['esm/alpha-3/index.js', esmify(JSON.stringify(alpha_3, null, 2))],
		['esm/numeric/index.js', esmify(JSON.stringify(numeric, null, 2))],
	]) {
		await fs.mkdir(path.dirname(filepath), { recursive: true });
		await fs.writeFile(filepath, data);
	}
	console.log('All done!');
}

function dataVariants(data) {
	const extract = (propName) =>
		data.map((entry) => ({
			name_pl: entry.name_pl,
			name_en: entry.name_en,
			code: entry[propName],
		}));
	return {
		full: data,
		alpha_2: extract('alpha_2'),
		alpha_3: extract('alpha_3'),
		numeric: extract('numeric'),
	};
}

async function scrapeData() {
	console.log(`Downloading HTML...`);
	const pageHtml = await axios.get(`https://pl.wikipedia.org/wiki/ISO_3166-1`);
	console.log('Building DOM...');
	const dom = new JSDOM(pageHtml.data);
	console.log('Parsing...');
	const dataTable = arrayify(
		dom.window.document.querySelectorAll(`.mw-parser-output table`)
	).find((table) =>
		arrayify(table.querySelectorAll(`tbody tr`)).find((row) => {
			const targetCell = row.querySelector('td:nth-child(2)');
			return (
				targetCell &&
				targetCell.textContent.toLowerCase().trim() === 'afghanistan'
			);
		})
	);
	return arrayify(dataTable.querySelectorAll('tr'))
		.slice(1)
		.map((row) => ({
			name_pl: cleanString(row.children[0].children[1].textContent),
			name_en: cleanString(row.children[1].textContent.replace('\n', '')),
			alpha_2: cleanString(row.children[2].children[0].children[0].textContent),
			alpha_3: cleanString(row.children[3].children[0].textContent),
			numeric: cleanString(row.children[4].children[0].textContent),
		}));
}

function cleanString(str) {
	return (
		str
			// remove wikipedia references
			.replace(/(\[.*\])/g, '')
			.trim()
	);
}

function esmify(code) {
	return `export default ${code}`;
}

function arrayify(value) {
	return Array.prototype.slice.call(value);
}

build();
