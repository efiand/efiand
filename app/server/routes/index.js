import { mainRoute } from "#server/routes/main.js";
import { notFoundRoute } from "#server/routes/not-found.js";
import { sitemapXmlRoute } from "#server/routes/sitemap-xml.js";
import { updateRoute } from "#server/routes/update.js";

/** @type {{ [name: string]: Route }} */
export const routes = {
	"/": mainRoute,
	"/404.html": notFoundRoute,
	"/sitemap.xml": sitemapXmlRoute,
	"/update.html": updateRoute,
};
