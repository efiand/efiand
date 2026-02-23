import { renderInnerPage } from "#common/templates/inner-page.js";

const PROJECTS = [
	{
		description: "Стартап-проект кулинарного блогера.",
		url: "aromachef.ru",
	},
	{
		description:
			"Конструктор кулинарной книги с возможностью добавления и редактирования рецептов. Визуальный редактор, категории, разделы.",
		url: "cookbook.efiand.ru",
	},
	{
		description: "Карточный пасьянс «Колодец».",
		url: "well.efiand.ru",
	},
	{
		description: "Произведения Андрей Раскатова.",
		url: "a-raskatov.github.io",
	},
];
const heading = "Портфолио";

export const portfolioRoute = {
	/** @type {RouteMethod} */
	async GET({ isAmp }) {
		return {
			page: {
				heading,
				pageTemplate: renderInnerPage({
					heading,
					isAmp,
					pathname: "/portfolio",
					template: /* html */ `
						<ul class="portfolio">
							${PROJECTS.map(
								({ description, url }) => /* html */ `
									<li class="portfolio__card">
										<a class="portfolio__link" href="https://${url}" target="_blank">${url}</a>
										<p>${description}</p>
									</li>
								`,
							).join("")}
						</ul>
					`,
				}),
			},
		};
	},
};
