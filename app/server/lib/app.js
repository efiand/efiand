import { createServer } from "node:http";
import { renderPromo } from "#common/components/promo.js";
import { log } from "#common/lib/log.js";
import { host, isDev, port } from "#server/constants.js";
import { renderPage } from "#server/lib/page.js";
import { routes } from "#server/routes/index.js";

/** @type {(error: unknown, url: URL) => Promise<{ statusCode: number; template: string }>} */
async function handleError(error, { href, pathname }) {
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

	if (!pathname?.startsWith("/__")) {
		log.error(`❌ [HTTP ERROR ${statusCode} | ${href}]`, error);
	}

	const heading = `Ошибка ${statusCode}`;
	const template = await renderPage({
		heading,
		pageTemplate: renderPromo(`${heading}.`, message),
	});

	return { statusCode, template };
}

/** @type {ServerMiddleware} */
async function next(req, res) {
	const url = new URL(`${host}${req.url}`);
	const { pathname } = url;
	const route = routes[pathname];

	let contentType = "text/html; charset=utf-8";
	let template = "";
	let statusCode = 200;

	try {
		if (!route) {
			throw new Error("Страница не найдена.", { cause: 404 });
		}

		const { method = "GET" } = req;
		if (!route[method]) {
			throw new Error("Method not allowed!", { cause: 405 });
		}

		const routeData = await route[method]({ req, res });
		({ contentType = "text/html; charset=utf-8", template = "" } = routeData);

		if (routeData.page) {
			template = await renderPage({ ...routeData.page, pathname });
		}
	} catch (error) {
		({ statusCode, template } = await handleError(error, url));
	}

	res.statusCode = statusCode;
	res.setHeader("Content-Type", contentType);
	res.end(template.trim());
}

/** @type {(middleware?: ServerMiddleware) => import("node:http").Server} */
export function createApp(middleware) {
	const server = createServer((req, res) => {
		if (middleware) {
			middleware(req, res, next);
		} else {
			next(req, res);
		}
	});

	server.listen(port, "localhost", () => {
		log.info(`✅ Сервер запущен по адресу: ${host}`);
	});

	return server;
}

/** @type {(server?: import("node:http").Server) => Promise<void>} */
export async function closeApp(server) {
	try {
		if (server) {
			await new Promise((resolve, reject) => {
				server.close((err) => (err ? reject(err) : resolve("")));
			});
		}
	} catch (error) {
		log.error("❌ [CLOSING ERROR]", error);
	}
}
