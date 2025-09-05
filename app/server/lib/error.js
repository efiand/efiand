import { renderPromo } from "#common/components/promo.js";
import { isDev } from "#server/constants.js";
import { renderPage } from "#server/lib/page.js";

export function getErrorPage(message = "Страница не найдена.", statusCode = 404) {
	const heading = `Ошибка ${statusCode}`;
	return {
		heading,
		pageTemplate: renderPromo(`${heading}.`, message),
	};
}

/** @type {(error: unknown, href: string) => Promise<{ statusCode: number; template: string }>} */
export async function handleError(error, href) {
	if (!isDev) {
		console.error(error, `[${href}]`);
	}

	let message = "На сервере произошла ошибка.";
	let statusCode = 500;
	if (error instanceof Error) {
		if (typeof error.cause === "number") {
			statusCode = error.cause;
		}
		if (isDev || statusCode !== 500) {
			({ message } = error);
		}
	}

	const template = await renderPage(getErrorPage(message, statusCode));

	return { statusCode, template };
}
