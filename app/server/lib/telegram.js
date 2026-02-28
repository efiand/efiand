import TelegramBot from 'node-telegram-bot-api';

const TG_ADMIN_ID = Number(process.env.TG_ADMIN_ID);

const HELLO = 'Доброго времени суток!';
const DETAILS = 'Мы свяжемся с Вами для уточнения деталей.';

const bot = new TelegramBot(process.env.TG_TOKEN);

/** @type {TelegramBot.SendMessageOptions} */
const messageOptions = { parse_mode: 'HTML' };

/** @type {Record<string, string>} */
const presets = {
	'/business': `Благодарим за заказ сайта по тарифу «Бизнес». ${DETAILS}`,
	'/mission': `Благодарим за заказ сайта по тарифу «Миссия». ${DETAILS}`,
	'/start': `${HELLO} Мы готовы ответить на Ваши вопросы.`,
};

/** @type {(payload: TelegramPayload) => Promise<void>} */
export async function sendTgMessage({ chat: { id = TG_ADMIN_ID, username = 'efiand_bot' } = {}, text }) {
	const template = text.trim().replace(/^\/start /, '/');

	const quote = /* html */ `<blockquote>${template}</blockquote>`;

	const user = username ? `@${username}` : id;
	await bot.sendMessage(TG_ADMIN_ID, /* html */ `Сообщение от ${user}:${quote}`, messageOptions);

	const answer = presets[template] || 'Спасибо за обращение! Мы ответим Вам в ближайшее время.';
	const addition = username ? '' : '\nЛогин в telegram отсутствует. Пожалуйста, пришлите ссылку для обратной связи.';

	await bot.sendMessage(id, `${answer}${addition}`, messageOptions);
}
