import { BASE_URL, PROJECT_DESCRIPTION, PROJECT_TITLE, version } from "#common/constants.js";
import { noAmp } from "#common/lib/no-amp.js";
import { renderLayout } from "#common/templates/layout.js";
import { renderDocumentTitle } from "#common/templates/title.js";
import { isDev } from "#server/constants.js";
import { renderAmpAssets } from "#server/lib/amp.js";

function renderAssets() {
	return isDev
		? /* html */ `
			<link rel="stylesheet" href="/client/css/critical.css">
			<script src="/client/entries/dev.js" type="module"></script>
		`
		: /* html */ `
			<link rel="stylesheet" href="/bundles/critical.css?v${version.CSS}">
		`;
}

/** @type {(pathname: string, isAmp: boolean) => string} */
function renderUrlMeta(pathname, isAmp) {
	if (!pathname) {
		return /* html */ `<meta name="robots" content="noindex, nofollow">`;
	}

	let template = /* html */ `<meta property="og:url" content="${pathname}">`;
	if (!isAmp && !noAmp(pathname)) {
		const ampUrl = pathname === "/" ? "/amp" : `/amp${pathname}`;
		template += /* html */ `<link rel="ampurl" href="${BASE_URL}${ampUrl}">`;
	}
	if (!pathname.startsWith("/__")) {
		template += /* html */ `<link rel="canonical" href="${BASE_URL}${pathname}">`;
	}

	return template;
}

/** @type {(data: LayoutData) => Promise<string>} */
export async function renderPage({
	description = PROJECT_DESCRIPTION,
	headTemplate = "",
	heading = "",
	isAmp = false,
	ogImage = "/web-app-manifest-512x512.png",
	ogImageWidth = 512,
	ogImageHeight = 512,
	pageTemplate = "",
	pathname = "",
}) {
	const title = renderDocumentTitle(heading);
	const assetsTemplate = isAmp ? await renderAmpAssets(pageTemplate.includes("<form")) : renderAssets();
	const descriptionTemplate = description
		? /* html */ `
			<meta name="description" content="${description}">
			<meta property="og:description" content="${description}">
		`
		: "";

	const template = /* html */ `
		<!DOCTYPE html>
		<html lang="ru" prefix="og: http://ogp.me/ns#" ${isAmp ? "⚡" : ""}>
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="apple-mobile-web-app-title" content="${PROJECT_TITLE}">
			<meta name="apple-mobile-web-app-capable" content="yes">

			<title>${title}</title>
			${renderUrlMeta(pathname, isAmp)}
			<meta property="og:title" content="${title}">
			<meta property="og:locale" content="ru_RU">
			<meta property="og:type" content="website">
			<meta property="og:site_name" content="efiand.ru">
			<meta property="og:image" content="${ogImage}">
			<meta property="og:image:width" content="${ogImageWidth}">
			<meta property="og:image:height" content="${ogImageHeight}">

			${descriptionTemplate}
			${assetsTemplate}

			<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
			<link rel="icon" type="image/svg+xml" href="/favicon.svg">
			<link rel="shortcut icon" href="/favicon.ico">
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
			<link rel="manifest" href="/site.webmanifest">

			<link href="/fonts/manrope-400.woff2" rel="preload" as="font" crossorigin="anonymous">
			<link href="/fonts/manrope-500.woff2" rel="preload" as="font" crossorigin="anonymous">

			${headTemplate}
		</head>

		${renderLayout({ isAmp, isDev, pageTemplate, pathname })}
		</html>
	`;

	return template;
}
