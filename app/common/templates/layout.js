import { YANDEX_METRIKA_TEMPLATE } from '#common/templates/yandex-metrika.js';

/** @type {(data: LayoutData) => string} */
export function renderLayout({ isAmp, isDev, pathname = '', pageTemplate }) {
	return /* html */ `
		<body>
			${isDev || isAmp || pathname.startsWith('/__') ? '' : YANDEX_METRIKA_TEMPLATE}
			<div class="layout">${pageTemplate}</div>
		</body>
	`;
}
