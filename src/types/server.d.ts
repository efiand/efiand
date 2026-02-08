declare global {
	import type { IncomingMessage, ServerResponse } from "node:http";

	type Changefreq = "daily" | "weekly" | "monthly" | "yearly" | undefined;

	type LayoutData = {
		isDev?: boolean;
		heading?: string;
		pageTemplate?: string;
		pathname?: string;
	};

	type Route = {
		[method: IncomingMessage["method"]]: RouteMethod;
	};

	type RouteData = {
		contentType?: string;
		page?: LayoutData;
		template?: string;
	};

	type RouteMethod = (params: RouteParams) => Promise<RouteData>;

	type RouteParams = {
		req: RouteRequest;
		res: RouteResponse;
	};

	type RouteRequest = IncomingMessage;

	type RouteResponse = ServerResponse<IncomingMessage> & { req: IncomingMessage };

	type ServerMiddleware = (req: IncomingMessage, res: RouteResponse, next?: ServerMiddleware) => Promise<void>;

	type SitemapPage = {
		loc: string;
		priority?: string;
	};
}

export {};
