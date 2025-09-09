import { createServer } from "node:http";
import { host, port } from "#server/constants.js";
import { handleError } from "#server/lib/error.js";
import { renderPage } from "#server/lib/page.js";
import { routes } from "#server/routes/index.js";

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
		({ statusCode, template } = await handleError(error, url.href));
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
		console.info(`Сервер запущен по адресу: ${host}`);
	});

	return server;
}
