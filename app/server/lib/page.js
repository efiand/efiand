import { BASE_URL } from "#common/constants.js";
import { YANDEX_METRIKA_TEMPLATE } from "#common/lib/yandex-metrika.js";
import { isDev } from "#server/constants.js";
import { getCss } from "#server/lib/css.js";

let cssCache = "";

const DESCRIPTION = "Сайт веб-разработчика: услуги по созданию сайтов недорого.";

/** @type {(data: LayoutData) => Promise<string>} */
export async function renderPage({ heading, pageTemplate, pathname = "" }) {
	const isInternalPage = pathname.startsWith("/__");
	const devTemplate = isDev ? /* html */ `<script src="/client/dev.js" type="module"></script>` : "";
	const canonicalTemplate = isInternalPage ? "" : /* html */ `<link rel="canonical" href="${BASE_URL}${pathname}">`;
	const title = `efiand.ru : ${heading}`;

	if (!cssCache) {
		cssCache = await getCss("critical.css");
	}

	return /* html */ `
		<!DOCTYPE html>
		<html lang="ru" prefix="og: http://ogp.me/ns#">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="apple-mobile-web-app-title" content="efiand.ru">
			<meta name="apple-mobile-web-app-capable" content="yes">

			<title>${title}</title>
			<meta name="description" content="${DESCRIPTION}">
			<meta property="og:title" content="${title}">
			<meta property="og:description" content="${DESCRIPTION}">
			<meta property="og:locale" content="ru_RU">
			<meta property="og:type" content="website">
			<meta property="og:site_name" content="efiand.ru">
			<meta property="og:url" content="${pathname}">
			${canonicalTemplate}

			<link href="fonts/manrope-400.woff2" rel="preload" as="font" crossorigin="anonymous">
			<link href="fonts/manrope-500.woff2" rel="preload" as="font" crossorigin="anonymous">

			<style>${cssCache}</style>
			${devTemplate}
		</head>

		<body>
			${isDev || isInternalPage ? "" : YANDEX_METRIKA_TEMPLATE}

			${pageTemplate}
		</body>

		</html>
	`;
}
