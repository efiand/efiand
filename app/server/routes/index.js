import { notFoundRoute } from '#server/routes/__/404.js';
import { updateRoute } from '#server/routes/__/update.js';
import { telegramRoute } from '#server/routes/api/telegram.js';
import { mainRoute } from '#server/routes/main.js';
import { sitemapXmlRoute } from '#server/routes/sitemap-xml.js';
import { orderRoute } from './order.js';
import { portfolioRoute } from './portfolio.js';

/** @type {{ [name: string]: Route }} */
export const routes = {
	'/': mainRoute,
	'/__/404': notFoundRoute,
	'/__/update': updateRoute,
	'/api/telegram': telegramRoute,
	'/order': orderRoute,
	'/portfolio': portfolioRoute,
	'/sitemap.xml': sitemapXmlRoute,
};
