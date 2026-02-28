import { renderPromo } from '#common/templates/promo.js';

/** @type {(statusCode: number, message: string) => string} */
export function renderErrorPage(statusCode, message) {
	return renderPromo(
		`Ошибка ${statusCode}. ${message}`,
		/* html */ `
			<a href="mailto:efiand@ya.ru?subject=efiand">Свяжитесь с разработчиком</a>
			или напишите в <a href="https://t.me/efiand_bot">telegram-бот</a>.
		`,
	);
}
