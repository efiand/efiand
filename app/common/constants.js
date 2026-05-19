export const BASE_URL = 'https://efiand.ru';

export const EMAIL = 'efiand@ya.ru';

export const PROJECT_TITLE = 'efiand';

export const PROJECT_DESCRIPTION = 'Сайт веб-разработчика: услуги по созданию сайтов недорого.';

export const YANDEX_METRIKA_ID = 102299682;

export const version = {
	CSS: 4,
};

/** @type {Record<string, string>} */
export const STATIC_MIME_TYPES = {
	'.css': 'text/css; charset=utf-8',
	'.html': 'text/html; charset=utf-8',
	'.ico': 'image/x-icon',
	'.js': 'application/javascript; charset=utf-8',
	'.png': 'image/png',
	'.svg': 'image/svg+xml; charset=utf-8',
	'.txt': 'plain/text; charset=utf-8',
	'.webmanifest': 'application/json; charset=utf-8',
	'.woff2': 'font/woff2',
};

export const staticExtensions = new Set(Object.keys(STATIC_MIME_TYPES));

export const PUBLIC_PAGES = ['/', '/order', '/portfolio', '/privacy'];

export const STATIC_PAGES = [...PUBLIC_PAGES, '/__/404', '/__/update'];

export const AMP_PAGES = PUBLIC_PAGES.map((page) => `/amp${page === '/' ? '' : [page]}`);
