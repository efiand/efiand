import { renderPromo } from "#common/components/promo.js";

export const updateRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				heading: "Обновление",
				pageTemplate: renderPromo("Мы обновляемся.", "Попробуйте обновить страницу."),
			},
		};
	},
};
