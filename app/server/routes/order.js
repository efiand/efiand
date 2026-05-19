import { EMAIL } from '#common/constants.js';
import { renderInnerPage } from '#common/templates/inner-page.js';

const TARIFFS = [
	{
		features: '',
		id: 'mission',
		note: '(количество предложений ограничено)',
		price: 'Бесплатно',
		title: 'Миссия',
	},
	{
		features: /* html */ `
			<li>Функциональность любой сложности</li>
			<li>Корректура по запросу</li>
			<li>Оперативная реализация</li>
		`,
		id: 'business',
		note: '',
		price: 'Цена договорная',
		title: 'Бизнес',
	},
];

const BASE_FEATURES_TEMPLATE = /* html */ `
	<li>Адаптивный дизайн</li>
	<li>Удобочитаемый текст</li>
	<li>Расстановка переносов</li>
	<li>Базовая accessibility-оптимизация</li>
`;

export const orderRoute = {
	/** @type {RouteMethod} */
	async GET({ isAmp }) {
		return {
			page: {
				heading: 'Заказать сайт',
				pageTemplate: renderInnerPage({
					heading: 'Тарифы',
					isAmp,
					pathname: '/order',
					template: /* html */ `<ul class="tariffs">${TARIFFS.map(renderTariff).join('')}</ul>`,
				}),
			},
		};
	},
};

/** @type {(tariff: typeof TARIFFS[number]) => string} */
function renderTariff({ features, note, price, title }) {
	const heading = `Тариф «${title}»`;

	return /* html */ `
		<li class="tariffs__card">
			<h2 class="tariffs__title">${heading}</h2>
			<ul class="tariffs__features">
				${BASE_FEATURES_TEMPLATE}
				${features}
			</ul>
			<p class="tariffs__price">${price}</p>
			<a class="tariffs__button button" href="mailto:${EMAIL}?subject=${heading}">
				Перейти к заказу
			</a>
			<p class="tariffs__note">${note}</p>
		</li>
	`;
}
