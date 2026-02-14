import { createServer } from "node:http";
import { log } from "#common/lib/log.js";
import { noAmp } from "#common/lib/no-amp.js";
import { renderErrorPage } from "#common/templates/error-page.js";
import { host, isDev, port } from "#server/constants.js";
import { renderPage } from "#server/lib/page.js";
import { getRequestBody } from "#server/lib/request.js";
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
		description: "Страница ошибок.",
		heading,
		pageTemplate: renderErrorPage(statusCode, message),
		pathname,
	});

	return { statusCode, template };
}

/** @type {ServerMiddleware} */
async function next(req, res) {
	const { method = "GET" } = req;
	const url = new URL(`${host}${req.url}`);
	const isAmp = url.pathname === "/amp" || url.pathname.startsWith("/amp/");
	const isApi = url.pathname.startsWith("/api/");
	const pathname = url.pathname === "/amp" ? "/" : url.pathname.replace(/^\/amp\//, "/");
	const [, rawRouteName = "", rawId, rawIdInApi] = pathname.split("/");
	const id = Number(isApi ? rawIdInApi : rawId);

	let routeName = rawRouteName;
	if (isApi) {
		routeName = `api/${rawId}`;
	}

	const routeKey = Number.isNaN(id) ? pathname : `/${routeName}/:id`;
	const route = routes[routeKey];

	let contentType = "text/html; charset=utf-8";
	let template = "";
	let statusCode = 200;

	try {
		if (!route) {
			throw new Error("Страница не найдена.", { cause: 404 });
		}

		if (isAmp && noAmp(routeKey)) {
			throw new Error("Страница не имеет AMP-версии.", { cause: 404 });
		}

		if (!route[method]) {
			if (method === "HEAD" && route.GET) {
				route.HEAD = route.GET;
			} else {
				throw new Error("Method not allowed!", { cause: 405 });
			}
		}

		const body = await getRequestBody(req);

		const routeData = await route[method]({ body, id, isAmp, req, res });
		({ contentType = "text/html; charset=utf-8", statusCode = 200, template = "" } = routeData);

		if (routeData.page) {
			template = await renderPage({ ...routeData.page, isAmp, pathname });
		}
	} catch (error) {
		({ statusCode, template } = await handleError(error, url));
	}

	res.setHeader("Content-Type", contentType);
	res.statusCode = statusCode;
	res.end(method === "HEAD" ? "" : template);
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
