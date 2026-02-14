const noAmpRoutes = ["/__", "/api", "/sitemap.xml"];

export function noAmp(pathname = "") {
	return noAmpRoutes.some((item) => pathname.startsWith(item));
}
