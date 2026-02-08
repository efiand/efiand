import { notFoundRoute } from "#server/routes/__/404.js";
import { updateRoute } from "#server/routes/__/update.js";
import { mainRoute } from "#server/routes/main.js";
import { sitemapXmlRoute } from "#server/routes/sitemap-xml.js";

/** @type {{ [name: string]: Route }} */
export const routes = {
	"/": mainRoute,
	"/__/404": notFoundRoute,
	"/__/update": updateRoute,
	"/sitemap.xml": sitemapXmlRoute,
};
