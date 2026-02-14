import { renderPromo } from "#common/templates/promo.js";

const heading = "Сайт обновляется";

export const updateRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				heading,
				pageTemplate: renderPromo("Мы обновляемся.", "Попробуйте обновить страницу."),
			},
		};
	},
};
