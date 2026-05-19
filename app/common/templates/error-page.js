import { EMAIL } from '#common/constants.js';
import { renderPromo } from '#common/templates/promo.js';

/** @type {(statusCode: number, message: string) => string} */
export function renderErrorPage(statusCode, message) {
	return renderPromo(
		`Ошибка ${statusCode}. ${message}`,
		/* html */ `
			<a href="mailto:${EMAIL}?subject=efiand.ru">Свяжитесь с разработчиком</a>.
		`,
	);
}
