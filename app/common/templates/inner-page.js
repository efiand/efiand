import { renderNav } from '#common/templates/nav.js';

const footerTemplate = /* html */ `
	<footer>
		<a class="inner-page__footer-link" href="/privacy">Политика конфиденциальности</a>
	</footer>
`;

export function renderInnerPage({ heading = '', isAmp = false, pathname = '', template = '' } = {}) {
	return /* html */ `
		<main class="inner-page">
			${renderNav('inner-page__nav', pathname, isAmp)}
			${heading ? /* html */ `<h1 class="_visually-hidden">${heading}</h1>` : ''}
			${template}

			${pathname === '/privacy' ? '' : footerTemplate}
		</main>
	`;
}
