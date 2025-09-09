import { BASE_URL } from "#common/constants.js";
import { YANDEX_METRIKA_TEMPLATE } from "#common/lib/yandex-metrika.js";
import { html } from "#common/utils/mark-template.js";
import { isDev } from "#server/constants.js";
import { getCss } from "#server/lib/css.js";

let cssCache = "";

/** @type {(data: LayoutData) => Promise<string>} */
export async function renderPage({ heading, pageTemplate = "", pathname = "" }) {
	if (!cssCache) {
		cssCache = await getCss("critical.css");
	}
	const devTemplate = isDev ? html`<script src="/client/dev.js" type="module"></script>` : "";

	const title = `efiand.ru : ${heading}`;

	return html`
		<!DOCTYPE html>
		<html lang="ru" prefix="og: http://ogp.me/ns#">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="apple-mobile-web-app-title" content="efiand.ru">
			<meta name="apple-mobile-web-app-capable" content="yes">

			<title>${title}</title>
			<meta property="og:title" content="${title}">
			<meta property="og:locale" content="ru_RU">
			<meta property="og:type" content="website">
			<meta property="og:site_name" content="efiand.ru">
			<meta property="og:url" content="${pathname}">
			<link rel="canonical" href="${BASE_URL}${pathname}">

			<link href="fonts/manrope-400.woff2" rel="preload" as="font" crossorigin="anonymous">
			<link href="fonts/manrope-500.woff2" rel="preload" as="font" crossorigin="anonymous">

			<style>${cssCache}</style>
			${devTemplate}
		</head>

		<body>
			${isDev ? "" : YANDEX_METRIKA_TEMPLATE}

			${pageTemplate}
		</body>

		</html>
	`;
}
