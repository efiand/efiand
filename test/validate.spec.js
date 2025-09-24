import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { XMLValidator } from "fast-xml-parser";
import { HtmlValidate } from "html-validate";
import { lintBem } from "posthtml-bem-linter";
import { host } from "#server/constants.js";
import { createApp } from "#server/lib/app.js";

const htmlvalidate = new HtmlValidate({
	extends: ["html-validate:recommended"],
	rules: {
		"long-title": "off",
		"no-trailing-whitespace": "off",
	},
});

/** @type {string[]} */
const pages = ["/", "/404.html", "/update.html"];

/** @type {string[]} */
let markups = [];

/** @type {import("node:http").Server | undefined} */
let server;

before(async () => {
	if (!server) {
		server = createApp();
	}

	if (!markups.length) {
		markups = await Promise.all(pages.map((page) => fetch(`${host}${page}`).then((res) => res.text())));
	}
});

test("All pages have valid HTML markup", async () => {
	let errorsCount = 0;

	await Promise.all(
		pages.map(async (page, i) => {
			const report = await htmlvalidate.validateString(markups[i]);
			if (!report.valid) {
				errorsCount++;
				report.results.forEach(({ messages }) => {
					messages.forEach(({ column, line, message, ruleUrl }) => {
						console.error(`${page} [${line}:${column}] ${message} (${ruleUrl})`);
					});
				});
			}
		}),
	);

	assert.strictEqual(errorsCount, 0);
});

test("All pages have valid BEM classes in markup", () => {
	let errorsCount = 0;

	pages.forEach(async (page, i) => {
		const result = lintBem({ content: markups[i], log: console.error, name: page });
		if (result.warningCount) {
			errorsCount++;
		}
	});

	assert.strictEqual(errorsCount, 0);
});

test("sitemap.xml is valid", async () => {
	const markup = await fetch(`${host}/sitemap.xml`).then((res) => res.text());
	const result = XMLValidator.validate(markup);
	const valid = result === true;

	if (!valid) {
		const { msg, line, col } = result.err;
		console.error(`sitemap.xml [${line}:${col}] ${msg}`);
	}

	assert.strictEqual(valid, true);
});

after(async () => {
	server?.close();
	setTimeout(process.exit, 0);
});
