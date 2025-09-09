import { getErrorPage } from "#server/lib/error.js";

export const notFoundRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: getErrorPage(),
		};
	},
};
