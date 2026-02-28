import { renderNav } from '#common/templates/nav.js';

export function renderInnerPage({ heading = '', isAmp = false, pathname = '', template = '' } = {}) {
	return /* html */ `
		<main class="inner-page">
			${renderNav('inner-page__nav', pathname, isAmp)}
			<h1 class="_visually-hidden">${heading}</h1>
			${template}
		</main>
	`;
}
