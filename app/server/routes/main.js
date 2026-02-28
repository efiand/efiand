import { renderPromo } from '#common/templates/promo.js';

export const mainRoute = {
	/** @type {RouteMethod} */
	async GET({ isAmp }) {
		return {
			page: {
				heading: 'Добро пожаловать!',
				pageTemplate: renderPromo('Привет. Меня зовут Андрей. Я вкладываю душу в сайты…', 'и они оживают!', isAmp),
			},
		};
	},
};
