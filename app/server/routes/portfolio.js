import { renderInnerPage } from '#common/templates/inner-page.js';

const PROJECTS = [
	{
		description: 'Стартап-проект кулинарного блогера.',
		url: 'aromachef.ru',
	},
	{
		description:
			'Конструктор кулинарной книги с возможностью добавления и редактирования рецептов. Визуальный редактор, категории, разделы.',
		url: 'cookbook.efiand.ru',
	},
	{
		description: 'Карточный пасьянс «Колодец».',
		url: 'well.efiand.ru',
	},
	{
		description: 'Произведения Андрей Раскатова.',
		url: 'a-raskatov.github.io',
	},
];
const heading = 'Портфолио';

export const portfolioRoute = {
	/** @type {RouteMethod} */
	async GET({ isAmp }) {
		return {
			page: {
				heading,
				pageTemplate: renderInnerPage({
					heading,
					isAmp,
					pathname: '/portfolio',
					template: /* html */ `<ul class="portfolio">${PROJECTS.map(mapProject).join('')}</ul>`,
				}),
			},
		};
	},
};

/** @type {(project: { description: string; url: string }) => string} */
function mapProject({ description, url }) {
	const href = `https://${url}`;
	const iconSrc = `${href}/favicon.svg`;

	return /* html */ `
		<li class="portfolio__card">
			<div class="portfolio__image">
				<img src="${iconSrc}" width="20" height="20" alt="Логотип проекта «${url}»">
			</div>
			<a class="portfolio__link" href="${href}" target="_blank">${url}</a>
			<p class="portfolio__description">${description}</p>
		</li>
	`;
}
