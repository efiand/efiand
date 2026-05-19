import { BASE_URL, PUBLIC_PAGES } from '#common/constants.js';

/** @type {(page: string) => string} */
function renderPage(page) {
	return /* xml */ `
		<url>
			<loc>${BASE_URL}${page}</loc>
			<priority>0.8</priority>
		</url>
	`;
}

export const sitemapXmlRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			contentType: 'application/xml',
			template: /* xml */ `<?xml version="1.0" encoding="UTF-8" ?>
				<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">
					${PUBLIC_PAGES.map(renderPage).join('')}
				</urlset>`,
		};
	},
};
