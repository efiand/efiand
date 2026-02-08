import { renderPromo } from "#common/components/promo.js";

const heading = "Ошибка 404";

export const notFoundRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				heading,
				pageTemplate: renderPromo(`${heading}.`, "Страница не найдена."),
			},
		};
	},
};
